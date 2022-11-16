import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IRoom} from '../../../model/i-room';
import {ITimes} from '../../../model/i-times';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMovieType} from '../../../model/i-movie-type';
import {RoomService} from '../../../service/room.service';
import {TimesService} from '../../../service/times.service';
import {MovieService} from '../../../service/movie.service';
import {ShowTimeService} from '../../../service/show-time.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IMovie} from '../../../model/i-movie';
import {IMovieDto} from '../../../dto/i-movie-dto';
import {IShowTimes} from '../../../model/i-show-times';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  formEditMovie: FormGroup;
  showTimeDto: FormGroup;
  movieTypeDto: FormArray;
  // time: FormArray;
  roomList: IRoom[] = [];
  timeList: ITimes[] = [];
  movieTypeList$: Observable<IMovieType[]>;
  dateProjection: string;
  movieDto: IMovieDto;
  showTime: IShowTimes[];
  submitted = false;
  selectedImage: any = null;
  id: number;


  constructor(private fb: FormBuilder,
              private roomService: RoomService,
              private timeService: TimesService,
              private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.getAllMovieType();
    this.getAllRoom();
    const id = this.activatedRoute.snapshot.params.id;
    this.movieService.getMovieById(id).subscribe(val => {
      this.movieDto = val;
      this.showTime = val.showTimeDto;
      this.id = val.id;
      this.formEditMovie.patchValue(this.movieDto);
      this.formEditMovie.get('image').setValue(this.movieDto.image);
      console.log(this.showTime);

      this.formEditMovie.get('showTimeDto').get('room').setValue(this.showTime[0].room);
      this.formEditMovie.get('showTimeDto').get('movie').setValue(this.showTime[0].movie);
      this.formEditMovie.get('showTimeDto').get('times').setValue(this.showTime[0].times);
      console.log(this.formEditMovie.value);
    });
    this.formEditMovie = this.fb.group({
      id: [],
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
          // dateProjection: [],
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
    const item = this.formEditMovie.value.showTimeDto;
    console.log(item);
    const id = item.room.id;
    const endDate = this.formEditMovie.value.endDay;
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

  onCheckboxChange(movieType: IMovieType, event) {
    this.movieTypeDto = this.formEditMovie.controls.movieType as FormArray;
    // this.movieType = this.formAddMovie.get('movieType') as FormArray;
    const name = movieType.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      this.movieTypeDto.push(new FormControl(name));
      console.log(this.movieTypeDto.getRawValue());
    } else {
      const i = this.movieTypeDto.controls.findIndex(x => x.value === {name});
      this.movieTypeDto.removeAt(i);
    }
  }

  editMovie() {
    this.submitted = true;
    const image = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(image);
    this.storage.upload(image, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formEditMovie.patchValue({image: url});

          // Call API to create vaccine
          // this.promotionService.createPromotion(this.promotionFormGroup.value).subscribe(() => {
          //   this.router.navigateByUrl('/list');
          //   console.log('Thêm mới khuyến mãi thành công!');
          // });
          this.movieService.saveMovie(this.formEditMovie.value).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Chỉnh sửa thành công!',
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
            this.formEditMovie.reset();
            // this.router.navigateByUrl('/list');
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

  compareWithIdRoom(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }


  }
