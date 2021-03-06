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

import { Injectable } from '@angular/core';
// MTA
//import { AddonFilesProvider } from './files';
import { AddonFilesProvider } from './orga';
import { CoreMainMenuHandler, CoreMainMenuHandlerData } from '@core/mainmenu/providers/delegate';

/**
 * Handler to inject an option into main menu.
 */
@Injectable()
export class AddonFilesMainMenuHandler implements CoreMainMenuHandler {
    name = 'AddonFiles';
   // priority = 400;
    priority = 0;

    constructor(private filesProvider: AddonFilesProvider) { }

    /**
     * Check if the handler is enabled on a site level.
     *
     * @return {boolean} Whether or not the handler is enabled on a site level.
     */
    isEnabled(): boolean | Promise<boolean> {
       // return this.filesProvider.isPluginEnabled();
	   return false;
    }

    /**
     * Returns the data needed to render the handler.
     *
     * @return {CoreMainMenuHandlerData} Data needed to render the handler.
     */
    getDisplayData(): CoreMainMenuHandlerData {
		// MTA - marker : don't show file icon in main menu 
		// MTA - for Orga:
		
		// MTA - Original:
		/*
        return {
            icon: 'folder',
            title: 'addon.files.files',
            page: 'AddonFilesListPage',
            class: 'addon-files-handler'
        };
		*/
		// NEW for orga:
		        return {
            icon: 'folder',
            title: 'Organisatorisches',
            page: 'OrgaListPage',
            class: 'addon-files-handler'
        };

    }
}
