import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudWithTokenService } from '../../service/crud-with-token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  author: any = {};
  name = '';
  errors: any = [];

  constructor(
    private route: ActivatedRoute,
    private crud: CrudWithTokenService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadAuthorData(id);
    });
  }

  loadAuthorData(id: string) {
    this.crud.get(`authors/${id}`).subscribe((data: any) => {
      this.author = data;
      this.name = this.author.name;
    });
  }

  onSubmit() {
    this.crud.put(`authors/${this.author.id}`, { name: this.name }).subscribe({
      next: (data: any) => {
        this.handleSuccessResponse(data);
      },
      error: (err) => {
        this.handleErrorResponse(err);
      },
    });
  }

  private handleSuccessResponse(data: any) {
    this.toastr.success(data.message);
    this.router.navigate(['/admin/authors']);
  }

  private handleErrorResponse(err: any) {
    this.errors = err.error.errors;
  }
}
