import {Component, Inject, OnInit} from '@angular/core';
import {IStudent} from '../../../entity/IStudent';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {StudentService} from "../../../core-module/student/student.service";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import * as url from 'url';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  student: IStudent;
  id: number;

  editForm = new FormGroup({
    studentId: new FormControl(''),
    studentName: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
      Validators.minLength(5), Validators.maxLength(50),
      this.customPatternValid(
        {pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'})
    ]),
    studentGender: new FormControl('', [Validators.required]),
    studentFatherName: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
      Validators.minLength(5), Validators.maxLength(50),
      this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      })
    ]),
    studentMotherName: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/),
      Validators.minLength(5), Validators.maxLength(50),
      this.customPatternValid({
        pattern: /^\s?\S+(?: \S+)*\s?$/, msg: 'Không thể nhập nhiều khoảng trắng.'
      })
    ]),
    studentDateOfBirth: new FormControl('', [Validators.required, this.check6]),
    studentEthnicity: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/)
    ]),
    studentAddress: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/)]),
    studentImage: new FormControl('', [Validators.required]),
    studentParentPhone: new FormControl('', [Validators.required,
      Validators.pattern(/^(0|84)[0-9]{9}$/),
      this.customPatternValid({
        pattern: /\b\d+\b/, msg: 'Số điện thoại chỉ được nhập số.'
      }),
      // this.customPatternValid({
      //   pattern: /^(\+84)[0-9]{9}$/, msg: 'Số điện thoại phải bắt đầu từ 0 hoặc +84. Ví dụ: +849xxxxxxxx hoặc 0xxxxxxxxxx.'
      // }),
    ]),
    studentReligion: new FormControl('',
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/)),
    studentStatus: new FormControl(''),
    deleteFlag: new FormControl('')
  });

  public customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
  }

  private selectedImage: any;

  constructor(private studentService: StudentService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getStudent(this.id);
    });
  }

  getStudent(index: number) {
    return this.studentService.findById(index).subscribe(item => {
      this.student = item;
      this.imgSrc = this.student.studentImage;
      console.log(this.student);
      this.editForm.setValue(item);
    });
  }

  edit(editForm) {
    const value = this.editForm.value;
    console.log(value);
    if (this.editForm.valid) {
      var filePath = `images/${editForm.value.studentName}_${editForm.value.id}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url => {
            this.editForm.value.studentImage = url;
            console.log(url);
            this.studentService.edit(value).subscribe(() => {
              // this.ngOnInit();
              this.snackBar.open('Sửa thông tin học sinh thành công', null, {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'end'
              });
            });
          }));
        })
      ).subscribe();
    } else {
      this.snackBar.open('Biễu mẫu sai, vui lòng nhập lại', null, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
  }

  validationMessage = {
    studentName: [
      {type: 'required', message: 'Họ và tên học sinh không được để trống.'},
      {type: 'pattern', message: 'Họ và tên học sinh không được chứa ký tự đặc biệt và số.'},
    ],
    studentGender: [
      {type: 'required', message: 'Bạn phải lựa chọn giới tính cho học sinh.'},
    ],
    studentFatherName: [
      {type: 'required', message: 'Họ và tên phụ huynh không được để trống.'},
      {type: 'pattern', message: 'Họ và tên phụ huynh không được chứa ký tự đặc biệt và số.'}
    ],
    studentMotherName: [
      {type: 'required', message: 'Họ và tên phụ huynh không được để trống.'},
      {type: 'pattern', message: 'Họ và tên phụ huynh không được chứa ký tự đặc biệt và số.'}
    ],
    studentDateOfBirth: [
      {type: 'required', message: 'Bạn phải lựa chọn ngày sinh cho học sinh.'},
      {type: 'invalidAge', message: 'Tuổi của học sinh phải lớn hơn 6 tuổi.'}
    ],
    studentEthnicity: [
      {type: 'required', message: 'Dân tộc không được để trống.'},
      {type: 'pattern', message: 'Dân tộc không được chứa ký tự đặc biệt và số.'}
    ],
    studentAddress: [
      {type: 'required', message: 'Quê quán không được để trống.'},
      {type: 'pattern', message: 'Quê quán không được chứa ký tự đặc biệt và số.'}
    ],
    studentParentPhone: [
      {type: 'required', message: 'Số điện thoại phụ huynh không được để trống.'},
      {type: 'pattern', message: 'Số điện thoại phải bắt đầu từ 0 hoặc 84. Ví dụ: 849xxxxxxxx hoặc 0xxxxxxxxxx.'},
    ],
    studentReligion: [
      {type: 'pattern', message: 'Tôn giáo không được chứa ký tự đặc biệt và số.'}
    ]
  };
  imgSrc: any;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/img_placeholder.png';
      this.selectedImage = null;
    }
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editForm.patchValue({
          studentImage: reader.result
        });
      };
    }
  }

  check6(check: AbstractControl) {
    let birthday = new Date(check.value);
    let age = Date.now() - birthday.getTime() - 86400000;
    const ageDate = new Date(age);
    age = ageDate.getUTCFullYear() - 1970;

    console.log(age);
    if (age < 6) {
      return {'invalidAge': true};
    }
    return null;
  }

  get formControl() {
    return this.editForm['controls'];
  }
}
