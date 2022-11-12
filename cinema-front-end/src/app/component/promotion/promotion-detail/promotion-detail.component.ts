import {Component, OnInit} from '@angular/core';
import {IPromotion} from '../../../model/i-promotion';
import {PromotionService} from '../../../service/promotion.service';
import {ActivatedRoute} from '@angular/router';

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
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => {
      this.id = Number(value.get('id'));
    });
    this.promotionService.getPromotionById(this.id).subscribe(value => {
      this.promotion = value;
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
