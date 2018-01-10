import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
settings: Settings = {
  allowRegistration: false,
  disabledBalanceOnAdd: true,
  disabledBalanceOnEdit: false
};

  constructor() {
    if (localStorage.getItem('clientPanelSettings') != null) {
      this.settings = JSON.parse(localStorage.getItem('clientPanelSettings'));
    }
   }

  getSettings() {
    return this.settings;
  }

  saveSettings(settings: Settings) {
    localStorage.setItem('clientPanelSettings', JSON.stringify(this.settings));
  }
}
