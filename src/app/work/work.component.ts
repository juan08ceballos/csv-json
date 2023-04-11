import { Component, OnInit } from '@angular/core';
interface CsvRow {
  name: string;
}


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  csvContent: string = '';
  jsonData: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }
  onFileSelect(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (event: any) => {
        this.csvContent = event.target.result;
        this.csvToJson();
      };
    }
  }

  csvToJson(): void {
    const lines = this.csvContent.split('\n');
    const headers = ['name'];
    const rows = [];
  
    for (let i = 0; i < lines.length; i++) {
      const data = lines[i].trim();
  
      if (data !== '') {
        const row: CsvRow = { name: data };
        row['name'] = data;
        rows.push(row);
      }
    }
  
    this.jsonData = rows.map((row, index) => ({
      id: index + 1,
      name: row['name'],
    }));
  }

  copyJson() {
    const compactJson = JSON.stringify(this.jsonData);
    navigator.clipboard.writeText(compactJson);
  }

}
