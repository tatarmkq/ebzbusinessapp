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
import { AddonCalendarProvider } from './calendar';
import { CoreMainMenuHandler, CoreMainMenuHandlerData } from '@core/mainmenu/providers/delegate';
// MTA - start
import { Injector } from '@angular/core';

import { CoreUserDelegate, CoreUserProfileHandler, CoreUserProfileHandlerData } from '@core/user/providers/user-delegate';
import { CoreSitesProvider } from '@providers/sites';
import { CoreContentLinksHelperProvider } from '@core/contentlinks/providers/helper';
import { CoreGradesMainMenuHandler } from '@core/grades/providers/mainmenu-handler';

import { CoreCourseOptionsHandler, CoreCourseOptionsHandler2, CoreCourseOptionsHandlerData, CoreCourseOptionsHandlerData2 } from '@core/course/providers/options-delegate';
import { CoreCourseProvider } from '@core/course/providers/course';
import { CoreGradesProvider } from '@core/grades/providers/grades';
import { CoreCoursesProvider } from '@core/courses/providers/courses';
import { CoreGradesCourseComponent } from '@core/grades/components/course/course';
// MTA - end

/**
 * Handler to inject an option into main menu.
 */
 
// MTA - start 
// ORIGINAL code :
 /*
@Injectable()
export class AddonCalendarMainMenuHandler implements CoreMainMenuHandler {
    name = 'AddonCalendar';
    priority = 900;

    constructor(private calendarProvider: AddonCalendarProvider) { }

    /**
     * Check if the handler is enabled on a site level.
     *
     * @return {boolean} Whether or not the handler is enabled on a site level.
     */
/*	 
    isEnabled(): boolean | Promise<boolean> {
        return !this.calendarProvider.isCalendarDisabledInSite();
    }

    /**
     * Returns the data needed to render the handler.
     *
     * @return {CoreMainMenuHandlerData} Data needed to render the handler.
     */
/*	 
	// MTA - start 
	// ORIGINAL code:
// HFV: 
    
  //	getDisplayData(): CoreMainMenuHandlerData {
 //   getDisplayData(injector: Injector, courseId: number): CoreCourseOptionsHandlerData | Promise<CoreCourseOptionsHandlerData> {
 //       return {
           // icon: 'calendar',
           // title: 'addon.calendar.calendar', 
			// NFV : page: 'CoreGradesCourseComponent',
			//page: CoreGradesCourseComponent,
			//class: 'core-grades-course-handler'
					
            // ORIGINAL code: 
			// page: 'AddonCalendarListPage',
            // class: 'addon-calendar-handler'
			// MTA - end
 //       };
//    }

}
*/


// MTA - end

@Injectable()
export class AddonCalendarMainMenuHandler implements CoreCourseOptionsHandler2 {
 //   name = 'CoreGrades';
 //   priority = 400;
    name = 'AddonCalendar';
    priority = 900; 

   // constructor(private gradesProvider: CoreGradesProvider, private coursesProvider: CoreCoursesProvider) {}
	constructor(private calendarProvider: AddonCalendarProvider) { }

    /**
     * Should invalidate the data to determine if the handler is enabled for a certain course.
     *
     * @param {number} courseId The course ID.
     * @param {any} [navOptions] Course navigation options for current user. See CoreCoursesProvider.getUserNavigationOptions.
     * @param {any} [admOptions] Course admin options for current user. See CoreCoursesProvider.getUserAdministrationOptions.
     * @return {Promise<any>} Promise resolved when done.
     */
    invalidateEnabledForCourse(courseId: number, navOptions?: any, admOptions?: any): Promise<any> {
		/*
        if (navOptions && typeof navOptions.grades != 'undefined') {
            // No need to invalidate anything.
            return Promise.resolve();
        }
		*/
		//return !this.calendarProvider.isCalendarDisabledInSite();
        //return this.coursesProvider.invalidateUserCourses();
		return Promise.resolve();
    }

    /**
     * Check if the handler is enabled on a site level.
     *
     * @return {boolean} Whether or not the handler is enabled on a site level.
     */
    isEnabled(): boolean | Promise<boolean> {
        return true;
    }

    /**
     * Whether or not the handler is enabled for a certain course.
     *
     * @param {number} courseId The course ID.
     * @param {any} accessData Access type and data. Default, guest, ...
     * @param {any} [navOptions] Course navigation options for current user. See CoreCoursesProvider.getUserNavigationOptions.
     * @param {any} [admOptions] Course admin options for current user. See CoreCoursesProvider.getUserAdministrationOptions.
     * @return {boolean|Promise<boolean>} True or promise resolved with true if enabled.
     */
    isEnabledForCourse(courseId: number, accessData: any, navOptions?: any, admOptions?: any): boolean | Promise<boolean> {
		/*
        if (accessData && accessData.type == CoreCourseProvider.ACCESS_GUEST) {
            return false; // Not enabled for guests.
        }

        if (navOptions && typeof navOptions.grades != 'undefined') {
            return navOptions.grades;
        }

        return this.gradesProvider.isPluginEnabledForCourse(courseId);
		*/
		return true;
    }

    /**
     * Returns the data needed to render the handler.
     *
     * @param {Injector} injector Injector.
     * @param {number} courseId The course ID.
     * @return {CoreCourseOptionsHandlerData|Promise<CoreCourseOptionsHandlerData>} Data or promise resolved with the data.
     */
	 
    getDisplayData(injector: Injector, courseId: number): CoreCourseOptionsHandlerData2 | Promise<CoreCourseOptionsHandlerData2> {
        return {
			// MTA - start 
			/* FV für Notenübersicht
            icon: 'calendar',
            title: 'addon.calendar.calendar', 
			// NFV : page: 'CoreGradesCourseComponent',
			page: CoreGradesCourseComponent,
			class: 'core-grades-course-handler'
			*/
			// AKT - FV : 
           // icon: 'calendar',
            icon: 'fa-graduation-cap',
            title: 'addon.calendar.calendar',
            page: 'CoreSiteHomeIndexPage',
			class: 'core-sitehome-handler'	
			
            // ORIGINAL code: 
			// page: 'AddonCalendarListPage',
            // class: 'addon-calendar-handler'
			// MTA - end			
		/*
			icon: 'calendar',
            title: 'core.grades.grades',
            class: 'core-grades-course-handler',
            page: CoreGradesCourseComponent
		*/
		    // MTA - end
        };
    }

}