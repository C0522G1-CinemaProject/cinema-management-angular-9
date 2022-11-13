import {Component, OnInit} from '@angular/core';
import {IPromotion} from '../../../model/i-promotion';
import {PromotionService} from '../../../service/promotion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {
  promotionNameSearch = '';

  khListPaging: IPromotion[];
  numberRecord = 5;
  curPage = 1;
  totalPage: number;

  promotionNameDelete: string;
  promotionIdDelete: number;

  constructor(private promotionService: PromotionService) {
  }

  ngOnInit(): void {
    this.promotionService.showPromotion(this.promotionNameSearch)
      .subscribe(list => {
        this.totalPage = Math.ceil(list.length / this.numberRecord);
      }, error => {
        console.log(error);
      }, () => {
        console.log('OK!');
      });

    this.promotionService.findPromotionSearchPaging(this.numberRecord, this.curPage,
      this.promotionNameSearch).subscribe(pagingList => {
      this.khListPaging = pagingList;
    }, error => {
      console.log(error);
    }, () => {
      console.log('Hiển thị khách hàng ở trang ' + this.curPage);
    });
  }

  next(): void {
    this.curPage++;
    this.ngOnInit();
  }

  previos(): void {
    this.curPage--;
    this.ngOnInit();
  }

  getInfoPromotionDelete(name: string, id: number): void {
    this.promotionNameDelete = name;
    this.promotionIdDelete = id;
  }

  deletePromotion(): void {
    this.promotionService.deletePromotion(this.promotionIdDelete).subscribe(() => {
      // 1 thông báo vip-pro:
      Swal.fire({
        icon: 'success',
        title: 'Xóa thành công!',
        text: 'Khách hàng: ' + this.promotionNameDelete,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      this.curPage = 1;
      this.ngOnInit();
    }, error => {
      console.log(error);
    }, () => {
      console.log('Xóa khách hàng thành công!');
    });
  }

  searchByMore(): void {
    this.curPage = 1;
    this.ngOnInit();
  }

}
