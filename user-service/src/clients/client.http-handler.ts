import { catchError, map, Observable, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

export function httpCallHandler(
  axiosCall: Observable<AxiosResponse>,
): Promise<AxiosResponse> {
  return firstValueFrom(
    axiosCall.pipe(
      map((res) => res.data),
      catchError((error) => throwError(error)),
    ),
  );
}
