// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NgModule } from '@angular/core';
import { CoreSiteHomeProvider } from './providers/sitehome';
import { CoreSiteHomeMainMenuHandler } from './providers/mainmenu-handler';
import { CoreSiteHomeIndexLinkHandler } from './providers/index-link-handler';
import { CoreMainMenuDelegate } from '@core/mainmenu/providers/delegate';
import { CoreContentLinksDelegate } from '@core/contentlinks/providers/delegate';

// List of providers (without handlers).
export const CORE_SITEHOME_PROVIDERS: any[] = [
    CoreSiteHomeProvider
];

@NgModule({
    declarations: [],
    imports: [
    ],
    providers: [
        CoreSiteHomeProvider,
        CoreSiteHomeMainMenuHandler,
        CoreSiteHomeIndexLinkHandler
    ],
    exports: []
})
export class CoreSiteHomeModule {
    constructor(mainMenuDelegate: CoreMainMenuDelegate, contentLinksDelegate: CoreContentLinksDelegate,
            mainMenuHandler: CoreSiteHomeMainMenuHandler, indexLinkHandler: CoreSiteHomeIndexLinkHandler) {
		// MTA - marker (7-d)
		console.log("HANDLER_REGISTERED_SITEHOME");
        mainMenuDelegate.registerHandler(mainMenuHandler);
        contentLinksDelegate.registerHandler(indexLinkHandler);
    }
}
