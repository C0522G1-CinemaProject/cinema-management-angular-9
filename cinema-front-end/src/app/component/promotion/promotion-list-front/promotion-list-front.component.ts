import {Component, OnInit} from '@angular/core';
import {PromotionService} from '../../../service/promotion.service';
import {IPromotion} from '../../../model/i-promotion';

@Component({
  selector: 'app-promotion-list-front',
  templateUrl: './promotion-list-front.component.html',
  styleUrls: ['./promotion-list-front.component.css']
})
export class PromotionListFrontComponent implements OnInit {
  promotionList: IPromotion[];
  morePromotionList: IPromotion[];
  numberRecord = 0;

  constructor(private promotionService: PromotionService) {
  }

  ngOnInit(): void {
    this.getPromotionList(this.numberRecord);
  }

  getPromotionList(numberP: number) {
    this.promotionService.getAllPromotion(numberP).subscribe(value => {
      if (this.numberRecord === 0) {
        // @ts-ignore
        this.promotionList = value.content;
      } else {
        // @ts-ignore
        this.morePromotionList = value.content;
        this.promotionList = this.promotionList.concat(this.morePromotionList);
      }
    });
  }

  loadMore() {
    this.numberRecord += 1;
    this.getPromotionList(this.numberRecord);
  }
}
