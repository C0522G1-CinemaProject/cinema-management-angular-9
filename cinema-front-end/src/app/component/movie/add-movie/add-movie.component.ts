import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IRoom} from '../../../model/i-room';
import {ITimes} from '../../../model/i-times';
import {RoomService} from 'src/app/service/room.service';
import {TimesService} from '../../../service/times.service';
import {MovieService} from '../../../service/movie.service';
import {IMovieType} from '../../../model/i-movie-type';
import {ShowTimeService} from '../../../service/show-time.service';

import {BehaviorSubject, Observable} from 'rxjs';
import {IMovie} from '../../../model/i-movie';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  formAddMovie: FormGroup;
  showTimeDto: FormGroup;
  movieTypeDto: FormArray;
  // time: FormArray;
  roomList: IRoom[] = [];
  timeList: ITimes[] = [];
  movieTypeList$: Observable<IMovieType[]>;
  dateProjection: string;
  k = 0;
  submitted = false;
  selectedImage: any = null;


  constructor(private fb: FormBuilder,
              private roomService: RoomService,
              private timeService: TimesService,
              private movieService: MovieService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.getAllMovieType();
    this.getAllRoom();
    this.formAddMovie = this.fb.group({
      name: [],
      image: [],
      startDay: [],
      endDay: [],
      director: [],
      filmTime: [],
      trailer: [],
      content: [],
      filmStudio: [],
      actor: [],
      version: [],
      movieTypeDto: this.fb.array([]),
      showTimeDto:
        this.fb.group({
          movie: [],
          room: [],
          dateProjection: [],
          times: []
        })
    });
  }

  getAllRoom() {
    this.roomService.getAllRoom().subscribe(value => {
      this.roomList = value;
      console.log(value);
    });
  }

  getInfo() {
    const item = this.formAddMovie.value.showTimeDto;
    console.log(item);
    const id = item.room.id;
    const endDate = this.formAddMovie.value.endDay;
    console.log(id, endDate);
    this.timeService.getAllTime(id, endDate).subscribe(value => {
      this.timeList = value;
      console.log(value);
    });
  }

  private getAllMovieType() {
    this.movieService.getAllMovieType().subscribe(value => {
      this.movieTypeList$ = new BehaviorSubject(value);
      console.log(value);
    });
  }

  onCheckboxChange(movieTypeDto: IMovieType, event) {
    this.movieTypeDto = this.formAddMovie.controls.movieTypeDto as FormArray;
    // this.movieType = this.formAddMovie.get('movieType') as FormArray;
    const name = movieTypeDto.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      this.movieTypeDto.push(new FormControl({movieTypeDto}));
      console.log(this.movieTypeDto.getRawValue());
    } else {
      const i = this.movieTypeDto.controls.findIndex(x => x.value === {name});
      this.movieTypeDto.removeAt(i);
    }
  }

  // addMovie() {
  //   this.submitted = true;
  //
  //   this.movieService.saveMovie(this.formAddMovie.getRawValue()).subscribe(() => {
  //     this.formAddMovie.reset();
  //   });
  //
  // }

  addMovie() {
    this.submitted = true;
    const image = this.getCurrentDateTime() + this.selectedImage.name;
    const destinationFilename = 'Movie/' + image;
    const fileRef = this.storage.ref(destinationFilename);
    this.storage.upload(destinationFilename, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formAddMovie.patchValue({image: url});

          // Call API to create vaccine
          // this.promotionService.createPromotion(this.promotionFormGroup.value).subscribe(() => {
          //   this.router.navigateByUrl('/list');
          //   console.log('Thêm mới khuyến mãi thành công!');
          // });
          this.movieService.saveMovie(this.formAddMovie.value).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Thêm mới thành công!',
              // text: mo.name,
              width: 600,
              padding: '3em',
              color: '#716add',
              // background: '#fff url(/images/trees.png)',
              backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
            });
            this.formAddMovie.reset();
          }, error => {
            console.log(error);
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
