import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {IPromotion} from '../../../model/i-promotion';
import {PromotionService} from '../../../service/promotion.service';

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  promotionList$: Observable<IPromotion[]>;
  total$: Observable<number>;
  promotionIdDelete: number;
  promotionNameDelete: string;

  constructor(private promotionService: PromotionService,
              private title: Title,
              private router: Router) {
    this.title.setTitle('Danh sách khuyến mãi');
  }

  ngOnInit(): void {
    this.paginate();
  }

  paginate() {
    this.promotionService.paginate(this.pageNumber, this.pageSize).subscribe(data => {
      console.log(data);
      this.promotionList$ = new BehaviorSubject<IPromotion[]>(data.content);
      this.total$ = new BehaviorSubject<number>(data.totalElements);
    });
  }

  deletePromotion(): void {
    swal.fire({
      title: 'Bạn chắc chắn muốn xóa?',
      text: this.promotionNameDelete,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy Bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.promotionService.deletePromotion(this.promotionIdDelete).subscribe(() => {
          swal.fire(
            'Đã xóa!',
            'Khuyến mãi đã  bị xóa',
            'success'
          );
          this.paginate();
          this.router.navigateByUrl('promotion/list');
        });
      }
    });


  }

  getInfoPromotion(id: number, name: string): void {
    this.promotionIdDelete = id;
    this.promotionNameDelete = name;
    this.deletePromotion();
  }

  showDetail(imgUrl: string, detail: string) {
    swal.fire({
      title: 'Chương trình khuyến mãi!',
      text: detail,
      imageUrl: imgUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
  }
}
