import { Component, OnInit, ElementRef } from '@angular/core';
import { DateAdapter } from '@angular/material';


declare const require: any;

declare const $: any;

@Component({
    selector: 'app-extendedforms-cmp',
    templateUrl: 'extendedforms.component.html',
    styles: [`md-calendar {
      width: 300px;
  }`]
})

export class ExtendedFormsComponent implements OnInit {
    simpleSlider = 40;
    doubleSlider = [20, 60];
    regularItems = ['Pizza', 'Pasta', 'Parmesan'];
    touch: boolean;
    yourModelDate: any;
    
    ngOnInit() {
        //  Init Bootstrap Select Picker
        if ($('.selectpicker').length !== 0) {
            $('.selectpicker').selectpicker({
                iconBase: 'fa',
                tickIcon: 'fa-check'
            });
        }

        // $('.datetimepicker').datetimepicker({
        //     icons: {
        //         time: 'fa fa-clock-o',
        //         date: 'fa fa-calendar',
        //         up: 'fa fa-chevron-up',
        //         down: 'fa fa-chevron-down',
        //         previous: 'fa fa-chevron-left',
        //         next: 'fa fa-chevron-right',
        //         today: 'fa fa-screenshot',
        //         clear: 'fa fa-trash',
        //         close: 'fa fa-remove'
        //     }
        //  });

         $('.datepicker').datetimepicker({
            format: 'MM/DD/YYYY',
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            },
            debug: true
         });

         $('.timepicker').datetimepicker({
// format: 'H:mm',    // use this format if you want the 24hours timepicker
            format: 'h:mm A',    // use this format if you want the 12hours timpiecker with AM/PM toggle
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
         });
    }
    myFunc(val: any) {
    console.log('value is changed to ' + val);
  }
}
