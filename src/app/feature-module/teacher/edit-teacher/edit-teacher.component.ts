import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {ITeacher} from "../../../../entity/ITeacher";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {DegreeService} from "../../../core-module/teacher/degree.service";
import {DivisionService} from "../../../core-module/teacher/division.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {IDivision} from "../../../../entity/IDivision";
import {IDegree} from "../../../../entity/IDegree";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  teacher!: ITeacher;
  degreeList: IDegree[] = [];
  divisionList: IDivision[] = [];
  selectedFile: File = null;
  id: number;
  image;
  downloadURL: Observable<string>;

  imgSrc: string = '';
  selectedImage: any = null;

  imageUpdate: string;


  public subcription: Subscription | undefined;
  public subcriptionParam: Subscription | undefined;

  teacherForm: FormGroup = new FormGroup({
    teacherName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[a-z]+$')]),
    teacherGender: new FormControl('', [Validators.required]),
    teacherDateOfBirth: new FormControl('', [Validators.required, Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$')]),
    teacherUniversity: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    teacherAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    teacherEmail: new FormControl('', [Validators.required, Validators.email]),
    teacherPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    teacherImage: new FormControl('', [Validators.required]),
    degree: new FormControl('', [Validators.required]),
    division: new FormControl('', [Validators.required]),

  });

  constructor(private teacherService: TeacherService, private router: Router, private activeRouter: ActivatedRoute,
              private degreeService: DegreeService, private divisionService: DivisionService, private storage: AngularFireStorage,private snackBar: SnackbarService) {


  }

  ngOnInit(): void {

    this.getAllDegree();

  }

  getAllDegree() {
    this.degreeService.findAll().subscribe(
      next => {
        this.degreeList = next;
      }, error => {
        console.log(error.message);
      }, () => {
        this.getAllDivision();
        console.log('1');
      }
    );
  }

  getAllDivision() {
    this.divisionService.findAll().subscribe(dataDivision => {
      this.divisionList = dataDivision;
    }, error => {
      console.log(error.message);
    }, () => {
      console.log('2');
      this.loadData();

    });
  }

  loadData() {
    this.subcriptionParam = this.activeRouter.params.subscribe((data: Params) => {
      this.id = data['id'];
      console.log(this.id);
      this.teacherService.findByIdTeacher(this.id).subscribe((teacherData: ITeacher) => {

        this.teacher = teacherData;
        console.log(this.teacher);
        this.teacherForm.patchValue({
          teacherId: this.teacher.teacherId,
          teacherName: this.teacher.teacherName,
          teacherGender: this.teacher.teacherGender,
          teacherUniversity: this.teacher.teacherUniversity,
          teacherDateOfBirth: this.teacher.teacherDateOfBirth,
          teacherAddress: this.teacher.teacherAddress,
          teacherEmail: this.teacher.teacherEmail,
          teacherPhone: this.teacher.teacherPhone,
          // teacherImage: this.teacher.teacherImage,
          degree: this.teacher.degree.degreeId,
          division: this.teacher.division.divisionId,
        });
      });
    });
  }

  update(): void {
    this.teacherService.update(this.teacherForm.value).subscribe(updateData => {
      // console.log(updateData);

      this.snackBar.showSnackbar('Thêm mới thành công', 'success');
      this.teacherForm.reset();
    }, error => {
      console.log(error.message);
      console.log(this.teacherForm.value);

      this.snackBar.showSnackbar('Thêm mới thất bại', 'error');
    });
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.image = url;
            }
            console.log(this.image);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }


  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];

    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }


}
