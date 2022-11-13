import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PromotionService} from '../../../service/promotion.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.css']
})
export class PromotionEditComponent implements OnInit {
  promotionFormGroup: FormGroup;
  promotionId: number;

  constructor(private promotionService: PromotionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.promotionId = Number(this.activatedRoute.snapshot.params.id);
    console.log(this.promotionId);
    this.promotionService.getInfo(this.promotionId).subscribe(promotion => {
      this.promotionFormGroup = new FormGroup({
        image: new FormControl(promotion.image),
        name: new FormControl(promotion.name),
        startTime: new FormControl(promotion.startTime),
        endTime: new FormControl(promotion.endTime),
        detail: new FormControl(promotion.detail),
        discount: new FormControl(promotion.discount)
      });
    }, error => {
      console.log(error);
    }, () => {
      console.log('OK!');
    });
  }
  editPromotion(id: number) {
    const promotion = this.promotionFormGroup.value;
    this.promotionService.editPromotion(id, promotion).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Chỉnh sửa thành công!',
        text: 'Khuyến mãi: ' + promotion.name,
        showConfirmButton: false,
        timer: 2500
      });

      this.router.navigateByUrl('');
    }, error => {
      console.log(error);
    }, () => {
      console.log('Cập nhật khuyến mãi thành công!');
    });
  }
  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }
}
