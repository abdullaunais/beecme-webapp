import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const $: any;
let sidebarTimer: any;
// The Moving Tab (the element that is moving on the sidebar, when you switch the pages)
// is depended on jQuery because it is doing a lot of calculations and changes based on Bootstrap
// collapse elements. If you have a better suggestion please send it to hello@creative-tim.com and
// we would be glad to talk more about this improvement. Thank you!

const mda: any = {
    movingTab: '<div class="sidebar-moving-tab"/>',
    isChild: false,
    sidebarMenuActive: '',
    movingTabInitialised: false,
    distance: 0,

    setMovingTabPosition: function($currentActive: any){
       $currentActive = mda.sidebarMenuActive;
       mda.distance = $currentActive.parent().position().top - 10;

       if ($currentActive.closest('.collapse').length !== 0) {
           const parent_distance = $currentActive.closest('.collapse').parent().position().top;
           mda.distance = mda.distance + parent_distance;
       }

       mda.moveTab();
    },
    initMovingTab: function(){
       mda.movingTab = $(mda.movingTab);

       mda.sidebarMenuActive = $('.sidebar .nav-container > .nav > li.active > a:not([data-toggle="collapse"]');

       if (mda.sidebarMenuActive.length !== 0) {
           mda.setMovingTabPosition(mda.sidebarMenuActive);
       } else {
           mda.sidebarMenuActive = $('.sidebar .nav-container .nav > li.active .collapse li.active > a');
           mda.isChild = true;
           this.setParentCollapse();
       }

       mda.sidebarMenuActive.parent().addClass('visible');

       let button_text = mda.sidebarMenuActive.html();
       mda.movingTab.html(button_text);

       $('.sidebar .nav-container').append(mda.movingTab);

       if (window.history && window.history.pushState) {
           $(window).on('popstate', function() {

               setTimeout(function(){
                   mda.sidebarMenuActive = $('.sidebar .nav-container .nav li.active a:not([data-toggle="collapse"])');

                   if (mda.isChild === true) {
                       this.setParentCollapse();
                   }
                   clearTimeout(sidebarTimer);

                   const $currentActive = mda.sidebarMenuActive;

                   $('.sidebar .nav-container .nav li').removeClass('visible');

                   const $movingTab = mda.movingTab;
                   $movingTab.addClass('moving');

                   $movingTab.css('padding-left', $currentActive.css('padding-left'));
                   button_text = $currentActive.html();

                   mda.setMovingTabPosition($currentActive);

                   sidebarTimer = setTimeout(function(){
                       $movingTab.removeClass('moving');
                       $currentActive.parent().addClass('visible');
                   }, 650);

                   setTimeout(function(){
                       $movingTab.html(button_text);
                   }, 10);
               }, 10);

           });
       }

       $('.sidebar .nav .collapse').on('hidden.bs.collapse', function () {
           const $currentActive = mda.sidebarMenuActive;

           mda.distance = $currentActive.parent().position().top - 10;

           if ($currentActive.closest('.collapse').length !== 0) {
               const parent_distance = $currentActive.closest('.collapse').parent().position().top;
               mda.distance = mda.distance + parent_distance;
           }

           mda.moveTab();
       });

       $('.sidebar .nav .collapse').on('shown.bs.collapse', function () {
           const $currentActive = mda.sidebarMenuActive;

           mda.distance = $currentActive.parent().position().top - 10;

           if ($currentActive.closest('.collapse').length !== 0) {
               const parent_distance = $currentActive.closest('.collapse').parent().position().top;
               mda.distance = mda.distance + parent_distance;
           }

           mda.moveTab();
       });

       $('.sidebar .nav-container .nav > li > a:not([data-toggle="collapse"])').click(function() {
           mda.sidebarMenuActive = $(this);
           const $parent = $(this).parent();

           if (mda.sidebarMenuActive.closest('.collapse').length === 0) {
               mda.isChild = false;
           }

           // we call the animation of the moving tab
           clearTimeout(sidebarTimer);

            let $currentActive = mda.sidebarMenuActive;

           $('.sidebar .nav-container .nav li').removeClass('visible');

           const $movingTab = mda.movingTab;
           $movingTab.addClass('moving');

           $movingTab.css('padding-left', $currentActive.css('padding-left'));
           button_text = $currentActive.html();

         $currentActive = mda.sidebarMenuActive;
           mda.distance = $currentActive.parent().position().top - 10;

           if ($currentActive.closest('.collapse').length !== 0) {
               const parent_distance = $currentActive.closest('.collapse').parent().position().top;
               mda.distance = mda.distance + parent_distance;
           }

           mda.moveTab();

           sidebarTimer = setTimeout(function(){
               $movingTab.removeClass('moving');
               $currentActive.parent().addClass('visible');
           }, 650);

           setTimeout(function(){
               $movingTab.html(button_text);
           }, 10);
       });
    },
    setParentCollapse: function() {
       if (mda.isChild === true) {
           const $sidebarParent = mda.sidebarMenuActive.parent().parent().parent();
           const collapseId = $sidebarParent.siblings('a').attr('href');

           $(collapseId).collapse('show');

           $(collapseId).collapse()
           .on('shown.bs.collapse', () => {
               mda.setMovingTabPosition();
           })
           .on('hidden.bs.collapse', () => {
               mda.setMovingTabPosition();
           });
       }
    },
    animateMovingTab: function(){
        clearTimeout(sidebarTimer);

        const $currentActive = mda.sidebarMenuActive;

        $('.sidebar .nav-container .nav li').removeClass('visible');

        const $movingTab = mda.movingTab;
        $movingTab.addClass('moving');

        $movingTab.css('padding-left', $currentActive.css('padding-left'));
        const button_text = $currentActive.html();

        mda.setMovingTabPosition($currentActive);

        sidebarTimer = setTimeout(function(){
            $movingTab.removeClass('moving');
            $currentActive.parent().addClass('visible');
        }, 650);

        setTimeout(function(){
            $movingTab.html(button_text);
        }, 10);
   },
   moveTab: function(){
       mda.movingTab.css({
           'transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-webkit-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-moz-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-ms-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-o-transform': 'translate3d(0px,' + mda.distance + 'px, 0)'
       });
   }
};

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, AfterViewInit {
    public menuItems: any[];

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        let isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
           // if we are on windows OS we activate the perfectScrollbar function
            const $sidebar = $('.sidebar-wrapper');
            $sidebar.perfectScrollbar();
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows) {
           // if we are on windows OS we activate the perfectScrollbar function
           $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
           $('html').addClass('perfect-scrollbar-on');
       } else {
           $('html').addClass('perfect-scrollbar-off');
       }
    }

    ngAfterViewInit() {
        // init Moving Tab after the view is initialisez
        setTimeout(() => {
            if (mda.movingTabInitialised === false) {
                mda.initMovingTab();
                mda.movingTabInitialised = true;
            }
        }, 10);
    }
}
