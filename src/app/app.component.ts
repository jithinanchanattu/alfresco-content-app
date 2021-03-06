/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2018 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslationService, PageTitleService, UserPreferencesService, AppConfigService } from '@alfresco/adf-core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private pageTitle: PageTitleService,
        private translateService: TranslationService,
        preferences: UserPreferencesService,
        config: AppConfigService) {
        // TODO: remove once ADF 2.3.0 is out (needs bug fixes)
        preferences.defaults.supportedPageSizes = config.get('pagination.supportedPageSizes');
    }

    ngOnInit() {
        const { router, pageTitle, route } = this;

        router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(() => {
                let currentRoute = route.root;

                while (currentRoute.firstChild) {
                    currentRoute = currentRoute.firstChild;
                }

                const snapshot: any = currentRoute.snapshot || {};
                const data: any = snapshot.data || {};

                if (data.i18nTitle) {
                    this.translateService.translate
                        .stream(data.i18nTitle)
                        .subscribe((title) => pageTitle.setTitle(title));

                } else {
                    pageTitle.setTitle(data.title || '');
                }
            });
    }
}
