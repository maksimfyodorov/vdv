import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../services/auth.types';

export function initialize(http: HttpClient, authService: AuthService): () => Promise<unknown> {
  return () => {
      return http.get('/api/users/self').toPromise()
        .then((res: User) => {
          authService.setCurrentUser(res);
        }).catch(e => console.log(e));
    };
}
