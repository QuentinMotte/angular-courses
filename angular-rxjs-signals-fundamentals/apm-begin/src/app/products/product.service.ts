import {inject, Injectable} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {Product} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HttpErrorService} from "../utilities/http-error.service";
import {ReviewService} from "../reviews/review.service";
import {Review} from "../reviews/review";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  readonly products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      shareReplay(1),
      catchError(err => this.handleError(err))
    )

  readonly product1$ = this.productSelected$
    .pipe(
      filter(Boolean),
      switchMap(productId => {
        return this.http.get<Product>(`${this.productsUrl}/${productId}`).pipe(
          switchMap(product => this.getProductWithReviews(product)),
          catchError(err => this.handleError(err)))
      })
    )

  readonly product$ = combineLatest([this.products$, this.productSelected$]).pipe(
    map(([products, selectedProductId]) => products.find(product => product.id === selectedProductId)),
    filter(Boolean),
    switchMap(product => this.getProductWithReviews(product)),
    catchError(err => this.handleError(err))
  )

  productSelected(productId: number): void {
    this.productSelectedSubject.next(productId);
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
