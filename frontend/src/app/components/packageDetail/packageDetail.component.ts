import { mergeMap, tap } from 'rxjs/operators'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PackageDetailService } from './packageDetail.service';
import { ActivatedRoute } from '@angular/router';
import { Package } from '../../org.bitship';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-packageDetail',
  templateUrl: './packageDetail.component.html',
  styleUrls: ['./packageDetail.component.css'],
  providers: [
    PackageDetailService,
    WebsocketService,
  ],
})
export class PackageDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  private sub2: any;

  private package: any
  private sender: any
  private history: any

  constructor(
    private route: ActivatedRoute,
    private service: PackageDetailService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      mergeMap((params) => {
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
        return forkJoin([
          this.service.getSingleCustomer(senderId),
          this.service.getHistory(pkg.barcode)
        ])
      })
    ).pipe(
      tap(([sender, history]) => {
        console.log('sender: ', sender)
        console.log('history: ', history)
        this.sender = sender
        this.history = history.reverse()
        return this.sender
      }),
    ).subscribe(() => {
    })

    this.sub2 = this.service.watchHistory().subscribe((pkg: any) => {
      console.log('watchHistoty: ', pkg)
      if (!this.history) {
        return
      }

      this.history.unshift(pkg)
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
