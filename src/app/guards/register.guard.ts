import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { Observable } from 'rxjs/Rx';
import { Route } from '@angular/router/src/config';
import { settings } from 'cluster';

@Injectable()
export class RegisterGuard implements CanActivate{
    constructor(
        public router: Router,
        public settingsService: SettingsService
    ) {}

    canActivate(): boolean {
        if (this.settingsService.getSettings().allowRegistration) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
