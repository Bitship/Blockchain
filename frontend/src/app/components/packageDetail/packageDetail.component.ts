import { mergeMap, tap } from 'rxjs/operators'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PackageDetailService } from './packageDetail.service';
import { ActivatedRoute } from '@angular/router';
import { Package } from '../../org.bitship';

@Component({
  selector: 'app-packageDetail',
  templateUrl: './packageDetail.component.html',
  styleUrls: ['./packageDetail.component.css'],
  providers: [PackageDetailService],
})
export class PackageDetailComponent implements OnInit, OnDestroy {

  private sub: any;

  private package: any
  private sender: any

  constructor(
    private route: ActivatedRoute,
    private service: PackageDetailService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      mergeMap((params) => {
        console.log('params', params)
        return this.service.getSingle(params.id)
      })
    ).pipe(
      tap((pkg: any) => {
        this.package = pkg
        console.log('pkg: ', this.package)
        return pkg
      }),
      mergeMap((pkg) => {
        const senderId = pkg.sender.split('#')[1]
        return this.service.getSingleCustomer(senderId)
      })
    ).subscribe((sender: any) => {
      console.log('sender: ', sender)
      this.sender = sender
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
