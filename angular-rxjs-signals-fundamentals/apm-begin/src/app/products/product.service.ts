import {computed, inject, Injectable, signal} from '@angular/core';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  throwError
} from "rxjs";
import {Product} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HttpErrorService} from "../utilities/http-error.service";
import {ReviewService} from "../reviews/review.service";
import {Review} from "../reviews/review";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {Result} from "../utilities/utility";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  selectedProductId = signal<number | undefined>(undefined)

  private productsResult$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      map(p => ({data: p} as Result<Product[]>)),
      shareReplay(1),
      catchError(err => of({data: [], error: this.errorService.formatError(err)} as Result<Product[]>))
    )
  private productsResult = toSignal(this.productsResult$, {
    initialValue: ({data: []} as Result<Product[]>)
  });
  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  readonly product$ = combineLatest([toObservable(this.products), toObservable(this.selectedProductId)]).pipe(
    map(([products, selectedProductId]) => products.find(product => product.id === selectedProductId)),
    filter(Boolean),
    switchMap(product => this.getProductWithReviews(product)),
    catchError(err => this.handleError(err))
  )

  productSelected(productId: number): void {
    this.selectedProductId.set(productId);
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map(reviews => ({...product, reviews} as Product)),
        )
    } else {
      return of(product);
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const errorMessage = this.errorService.formatError(err);
    return throwError(() => errorMessage)
  }

}
