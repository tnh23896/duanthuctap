import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any;
  constructor(
    private crud: CrudWithTokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getRevenue();
  }
  getRevenue() {
    this.spinner.show();
    this.crud.get('dashboard').subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.data = data;
        var myChart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels: data.revenueForThisWeek.map((item: any) => item.day),
            datasets: [
              {
                label: 'Doanh Thu tuần này',
                data: data.revenueForThisWeek.map((item: any) => item.revenue),
                backgroundColor: '#0196FD',
                borderColor: '#0196FD',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      error: (err) => {
        if (err.status === 403) {
          this.spinner.hide();
          this.router.navigate(['/403']);
        }
        this.spinner.hide()
          console.log(err);
          ;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        
      },
    });
  }
}
