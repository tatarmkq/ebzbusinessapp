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
import { CoreEventsProvider } from '@providers/events';
import { CoreDelegate, CoreDelegateHandler } from '@classes/delegate';
import { CoreLoggerProvider } from '@providers/logger';
import { CoreSitesProvider } from '@providers/sites';
import { Subject, BehaviorSubject } from 'rxjs';

/**
 * Interface that all main menu handlers must implement.
 */
export interface CoreMainMenuHandler extends CoreDelegateHandler {
    /**
     * The highest priority is displayed first.
     * @type {number}
     */
    priority: number;
	
	// MTA - start (11)
    /**
     * Special parameter for rendering a EBZ special page ("Veranstaltungsplan")
     */
    module_obj?: any;
    // MTA - end	

    /**
     * Returns the data needed to render the handler.
     *
     * @return {CoreMainMenuHandlerData} Data.
     */
    getDisplayData(): CoreMainMenuHandlerData;
}

/**
 * Data needed to render a main menu handler. It's returned by the handler.
 */
// MTA - marker (11) 
export interface CoreMainMenuHandlerData {
    /**
     * Name of the page to load for the handler.
     * @type {string}
     */
    page: string;

    /**
     * Title to display for the handler.
     * @type {string}
     */
    title: string;

    /**
     * Name of the icon to display for the handler.
     * @type {string}
     */
    icon: string; // Name of the icon to display in the tab.

    /**
     * Class to add to the displayed handler.
     * @type {string}
     */
    class?: string;

    /**
     * If the handler has badge to show or not.
     * @type {boolean}
     */
    showBadge?: boolean;

    /**
     * Text to display on the badge. Only used if showBadge is true.
     * @type {string}
     */
    badge?: string;

    /**
     * If true, the badge number is being loaded. Only used if showBadge is true.
     * @type {boolean}
     */
    loading?: boolean;

    /**
     * Params to pass to the page.
     * @type {any}
     */
    pageParams?: any;
}


/**
 * Data returned by the delegate for each handler.
 */
export interface CoreMainMenuHandlerToDisplay extends CoreMainMenuHandlerData {
    /**
     * Name of the handler.
     * @type {string}
     */
    name?: string;

    /**
     * Priority of the handler.
     * @type {number}
     */
    priority?: number;
}

/**
 * Service to interact with plugins to be shown in the main menu. Provides functions to register a plugin
 * and notify an update in the data.
 */
@Injectable()
export class CoreMainMenuDelegate extends CoreDelegate {
    protected loaded = false;
	// MTA - marker (7) 
    protected siteHandlers: Subject<CoreMainMenuHandlerToDisplay[]> = new BehaviorSubject<CoreMainMenuHandlerToDisplay[]>([]);
    protected featurePrefix = 'CoreMainMenuDelegate_';

    constructor(protected loggerProvider: CoreLoggerProvider, protected sitesProvider: CoreSitesProvider,
            protected eventsProvider: CoreEventsProvider) {
        super('CoreMainMenuDelegate', loggerProvider, sitesProvider, eventsProvider);

        eventsProvider.on(CoreEventsProvider.LOGOUT, this.clearSiteHandlers.bind(this));
    }

    /**
     * Check if handlers are loaded.
     *
     * @return {boolean} True if handlers are loaded, false otherwise.
     */
    areHandlersLoaded(): boolean {
        return this.loaded;
    }

    /**
     * Clear current site handlers. Reserved for core use.
     */
    protected clearSiteHandlers(): void {
        this.loaded = false;
        this.siteHandlers.next([]);
    }

    /**
     * Get the handlers for the current site.
     *
     * @return {Subject<CoreMainMenuHandlerToDisplay[]>} An observable that will receive the handlers.
     */
	 // MTA - marker (7 - b)
    getHandlers(): Subject<CoreMainMenuHandlerToDisplay[]> {
		 //console.log("SITE-HANDLERS-LENGTH = " + JSON.stringify(this.siteHandlers));
		// console.log("SITE-HANDLERS-DELEGATED = " + this.siteHandlers);
		// console.log("SITE-HANDLERS-LENGTH = " + this.siteHandlers.length);
		//for (let i = 0; i < this.siteHandlers.length; i++)
		//	console.log("SITE-HANDLER-TITLE = " + this.siteHandlers[i].title);
        return this.siteHandlers;
    }

    /**
     * Update handlers Data.
     */
    updateData(): void {
        const handlersData: any[] = [];

        for (const name in this.enabledHandlers) {
			// MTA - start (7-b)
			console.log("SITE-HANDLERS-ENABLED = " + name);
			// MTA - end
            const handler = <CoreMainMenuHandler> this.enabledHandlers[name],
                data = handler.getDisplayData();

            handlersData.push({
                name: name,
                data: data,
                priority: handler.priority
            });
        }

        // Sort them by priority.
        handlersData.sort((a, b) => {
            return b.priority - a.priority;
        });

        // Return only the display data.
        const displayData = handlersData.map((item) => {
            // Move the name and the priority to the display data.
            item.data.name = item.name;
            item.data.priority = item.priority;

            return item.data;
        });

        this.loaded = true;
        this.siteHandlers.next(displayData);
    }
}
