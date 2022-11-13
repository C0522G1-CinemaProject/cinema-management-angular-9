import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PromotionService} from '../../../service/promotion.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.css']
})
export class PromotionCreateComponent implements OnInit {
  promotionFormGroup: FormGroup = new FormGroup({
    image: new FormControl(),
    name: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    detail: new FormControl(),
    discount: new FormControl()
  });

  constructor(private promotionService: PromotionService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    const promotion = this.promotionFormGroup.value;
    this.promotionService.createPromotion(promotion).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Thêm mới thành công!',
        text: 'Khuyến mãi: ' + promotion.name,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
      });
      this.promotionFormGroup.reset();
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigateByUrl('promotion/list');
      console.log('Thêm mới khuyến mãi thành công!');
    });
  }


}
