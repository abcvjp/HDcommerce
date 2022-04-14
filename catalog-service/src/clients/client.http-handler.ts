import { catchError, map, Observable, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

export function httpCallHandler(
  axiosCall: Observable<AxiosResponse>,
): Promise<AxiosResponse> {
  return firstValueFrom(
    axiosCall.pipe(
      catchError((error) => throwError(error)),
      map((res) => (res.data.data ? res.data.data : res.data)),
    ),
  );
}
