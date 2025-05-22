import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anagram',
  standalone: false,
  templateUrl: './anagram.component.html',
  styleUrl: './anagram.component.scss'
})
export class AnagramComponent implements OnInit {
  anagram!:FormGroup;
  btnCLicked: boolean = false;
  isSuccess: boolean = false;
  
  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.anagram = this.formBuilder.group({
      word1:[''],
      word2:['']
    })
  }
  isAnagram(firstWord: string, secondWord: string): boolean {
    const word1 = firstWord.toLowerCase().trim();
    const word2 = secondWord.toLowerCase().trim();
    const sortedFirstWord = word1.split('').sort().join('');
    const sortedSecondWord = word2.split('').sort().join('');

    return sortedFirstWord === sortedSecondWord;
  }
  onSubmit() {
    console.log("btn clicked");
    let word1 = this.anagram.value.word1;
    let word2 = this.anagram.value.word2;
    this.btnCLicked = true;
    if (this.isAnagram(word1, word2)) {
      this.isSuccess = true;
        } else {
      this.isSuccess = false;
    }
  }


}
