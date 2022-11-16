import {Component, OnInit} from '@angular/core';
import {IPromotion} from '../../../model/i-promotion';
import {PromotionService} from '../../../service/promotion.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {
  promotion: IPromotion;
  id: number;
  promotionList: IPromotion[];
  numberRecord = 0;


  constructor(private promotionService: PromotionService,
              private title: Title,
              private activatedRoute: ActivatedRoute) {
    this.title.setTitle('Thông tin chi tiết khuyến mãi')
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => {
      this.id = +Number(value.get('id'));
      this.promotionService.getPromotionById(this.id).subscribe(pro => {
        this.promotion = pro;
      });
    });
    this.getPromotionList(this.numberRecord);
  }

  getPromotionList(numberP: number) {
    this.promotionService.getAllPromotion(numberP).subscribe(value => {
      // @ts-ignore
      this.promotionList = value.content;
    });
  }
}
