import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewChecked {

  constructor(private title: Title) { }

  ngAfterViewChecked(): void {
    let path = location.pathname;
    
    $('.nav li.nav-item a.nav-link').each((index:any, element:any) => {
      
      if (!$(element).hasClass('text-danger')) {
        if (path.toString().includes($(element).attr('href'))) {
          $(element).addClass('text-white').removeClass('text-muted');
        } else {
          $(element).addClass('text-muted').removeClass('text-white');
        }
      }
    });

    $('.navbar-nav li.nav-item a.nav-link').each((index:any, element:any) => {
      
      if (!$(element).hasClass('text-danger')) {
        if (path.toString().includes($(element).attr('href'))) {
          $(element).addClass('text-white').removeClass('text-muted');
        } else {
          $(element).addClass('text-muted').removeClass('text-white');
        }
      }
    });
  }

  ngOnInit(): void {
    
    this.title.setTitle('Cooperativa');
    
    $(() => {
      $('#sidebarCollapse').on('click', () => {
        $('#sidebar, #page-content').toggleClass('active');
      });
    });
  }
}