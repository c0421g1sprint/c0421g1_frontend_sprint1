import {Component, OnInit} from '@angular/core';
import {IStudent} from '../../../entity/IStudent';
import {StudentService} from "../../../core-module/student/student.service";
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireStorage} from '@angular/fire/storage';
import {filter, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  imgSrc: string = '/assets/img/img_placeholder.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  newStudent: IStudent;
  showSpinner = false;

  createForm: FormGroup = new FormGroup({
    id: new FormControl(''),
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
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]*$/))
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

  constructor(private studentService: StudentService,
              private router: Router,
              private snackBar: MatSnackBar,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
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

  createStudent(createForm) {
    const value = this.createForm.value;
    console.log(value);
    console.log(createForm);
    if (this.createForm.valid) {
      this.showSpinner = true;
      var filePath = `images/${createForm.value.studentName}_${createForm.value.id}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url => {
            this.createForm.value.studentImage = url;
            console.log(url);
            this.studentService.create(value).subscribe(() => {
              setTimeout(() => {
                this.showSpinner = false;
                this.ngOnInit();
                this.snackBar.open('Tạo mới học sinh thành công', null, {duration: 3000});
              });
            });
          }));
        })
      ).subscribe();
    } else {
      const dateOfBirth = new Date(createForm.value.studentDateOfBirth);
      console.log(dateOfBirth);
      this.snackBar.open('Biễu mẫu sai, vui lòng nhập chính xác', null, {duration: 3000});
    }
  }

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
  }

  get formControl() {
    return this.createForm['controls'];
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

  resetForm() {
    this.createForm.reset();
  }
}
