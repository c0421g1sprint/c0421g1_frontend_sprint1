import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {ITeacher} from "../../../entity/ITeacher";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {DegreeService} from "../../../core-module/teacher/degree.service";
import {DivisionService} from "../../../core-module/teacher/division.service";

import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {IDivision} from "../../../entity/IDivision";
import {IDegree} from "../../../entity/IDegree";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {AngularFireStorage} from "@angular/fire/storage";

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


  public subcription: Subscription | undefined;
  public subcriptionParam: Subscription | undefined;

  teacherForm: FormGroup = new FormGroup({
    teacherId: new FormControl(''),
    teacherName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    teacherGender: new FormControl('', [Validators.required]),
    teacherDateOfBirth: new FormControl('', [Validators.required, this.check18]),
    teacherUniversity: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    teacherAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    teacherEmail: new FormControl('', [Validators.required, Validators.email]),
    teacherPhone: new FormControl('', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]),
    teacherImage: new FormControl(''),
    degree: new FormControl('', [Validators.required]),
    division: new FormControl('', [Validators.required]),
  });

  constructor(private teacherService: TeacherService, private router: Router, private activeRouter: ActivatedRoute,
              private degreeService: DegreeService, private divisionService: DivisionService, private storage: AngularFireStorage, private snackBar: SnackbarService) {


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
          teacherImage: this.teacher.teacherImage,
          degree: this.teacher.degree.degreeId,
          division: this.teacher.division.divisionId,
        });
        console.log(this.teacherForm.value);

      });
    });
  }

  check18(check: AbstractControl) {
    let birthday = new Date(check.value);
    let age = Date.now() - birthday.getTime() - 86400000;
    const ageDate = new Date(age);
    age = ageDate.getUTCFullYear() - 1970;

    console.log(age);
    if (age < 18) {
      return {'invalidAge': true};
    } else if (age > 100) {
      return {'overAge': true};
    }
    return null;
  }



  update(): void {
    for (let degree of this.degreeList) {
      if (degree.degreeId == this.teacherForm.value.degree) {
        this.teacherForm.value.degree = degree;
        console.log(this.teacherForm);
      }
    }

    for (let division of this.divisionList) {
      if (division.divisionId == this.teacherForm.value.division) {
        this.teacherForm.value.division = division;
        console.log(this.teacherForm);
      }
    }

    if (this.teacherForm.valid) {
      const value = this.teacherForm.value;

      var filePath = `images/${this.teacherForm.value.teacherName}_${this.teacherForm.value.id}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url => {
            this.teacherForm.value.teacherImage = url;
            console.log(url);
            this.teacherService.update(value).subscribe(() => {
              // this.ngOnInit();
              this.snackBar.showSnackbar('Sửa thông tin học sinh thành công', 'success');
              this.router.navigateByUrl("teacher/list");
            });
          }));
        })
      ).subscribe();
    } else {
      this.snackBar.showSnackbar('Biễu mẫu sai, vui lòng nhập lại', 'success');
    }
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

  validationMessage = {
    teacherDateOfBirth: [
      {type: 'required', message: 'Ngày sinh không được để trống.'},
      {type: 'invalidAge', message: 'Tuổi của học sinh phải lớn hơn 18 tuổi.'},
      {type: 'overAge', message: 'Tuổi không được lớn hơn 100 tuổi '}
    ]
  }

}
