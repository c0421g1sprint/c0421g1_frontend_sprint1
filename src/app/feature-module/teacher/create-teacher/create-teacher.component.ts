import {Component, OnInit} from '@angular/core';
import {IDegree} from "../../../entity/IDegree";
import {IDivision} from "../../../entity/IDivision";
import {Observable} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../../core-module/teacher/teacher.service";
import {DegreeService} from "../../../core-module/teacher/degree.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/storage";
import {DivisionService} from "../../../core-module/teacher/division.service";
import {ITeacher} from "../../../entity/ITeacher";
import {finalize} from "rxjs/operators";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {ListTeacherComponent} from "../list-teacher/list-teacher.component";

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {

  degreeList: IDegree[];
  divisionList: IDivision [] = [];

  selectedFile: File = null;
  image;
  downloadURL: Observable<string>;

  imgSrc: string = '';
  selectedImage: any = null;


  teacherForm: FormGroup = new FormGroup({
    teacherName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    teacherGender: new FormControl('', [Validators.required]),
    teacherDateOfBirth: new FormControl('', [Validators.required, this.check18, Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$')]),
    teacherUniversity: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    teacherAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    teacherEmail: new FormControl('', [Validators.required, Validators.email]),
    teacherPhone: new FormControl('', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]),
    teacherImage: new FormControl(''),
    degree: new FormControl('', [Validators.required]),
    division: new FormControl('', [Validators.required]),
  });

  constructor(private teacherService: TeacherService, private degreeService: DegreeService,
              private divisionService: DivisionService, private router: Router, private storage: AngularFireStorage, private snackBar: SnackbarService) {
  }

  ngOnInit(): void {

    this.teacherForm.reset();
    this.getAllDegree();
    this.getAllDivision();

  }

  getAllDegree() {
    this.degreeService.findAll().subscribe(dataDegree => {
        this.degreeList = dataDegree;
        console.log(dataDegree);
      }
    );
  }

  getAllDivision() {
    this.divisionService.findAll().subscribe(dataDivision => {
      this.divisionList = dataDivision;
      console.log(dataDivision);
    });
  }


  saveTeacher(): void {
    let teachers: ITeacher | any = {
      teacherName: this.teacherForm.get('teacherName').value,
      teacherGender: this.teacherForm.get('teacherGender').value,
      teacherDateOfBirth: this.teacherForm.get('teacherDateOfBirth').value,
      teacherUniversity: this.teacherForm.get('teacherUniversity').value,
      teacherAddress: this.teacherForm.get('teacherAddress').value,
      teacherEmail: this.teacherForm.get('teacherEmail').value,
      teacherPhone: this.teacherForm.get('teacherPhone').value,
      teacherImage: this.image,
      degree: this.teacherForm.get('degree').value,
      division: this.teacherForm.get('division').value,

    };

    this.teacherService.saveTeacher(teachers).subscribe(data => {
      console.log(data);

      // this.teacherForm.reset();


      window.location.reload();


      this.snackBar.showSnackbar('Thêm mới thành công', 'success');
    }, error => {
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

  validationMessage = {
    teacherDateOfBirth: [
      {type: 'required', message: 'Ngày sinh không được để trống.'},
      {type: 'invalidAge', message: 'Tuổi của học sinh phải lớn hơn 18 tuổi.'},
      {type: 'overAge', message: 'Tuổi không được lớn hơn 100 tuổi '}
    ]
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
}
