import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fe-calculator',
    template: require('./fecalculator.component.html'),
    styles: [require('./fecalculator.component.css')]
})

export class FireEmblemCalculatorComponent implements OnInit {
    atkInput: number;
    spdInput: number;
    defInput: number;
    resInput: number;

    enemyAtk: number;
    enemySpd: number;
    enemyDef: number;
    enemyRes: number;

    min: number = 1;
    max: number = 50;

    constructor(private httpObj: Http) {
    }

    sendData(): void {
        let playerObj = {
            atk: this.atkInput,
            spd: this.spdInput,
            def: this.defInput,
            res: this.resInput
        };

        let enemyObj = {
            atk: this.enemyAtk,
            spd: this.enemySpd,
            def: this.enemyDef,
            res: this.enemyRes
        };

        /*this.httpObj.get('/api/SampleData/BattleCalculator').subscribe(result => {
            console.log(result);
        });*/

        this.httpObj.post('/api/SampleData/BattleCalculator',
            {
                player: playerObj,
                enemy: enemyObj
            }, null).subscribe(result => {
                console.log(result);
            });
        console.log(playerObj);
    }

    randomizeStats(): void {
        this.enemyAtk = this.getRandomNumber();
        this.enemyDef = this.getRandomNumber();
        this.enemyRes = this.getRandomNumber();
        this.enemySpd = this.getRandomNumber();
    }

    getRandomNumber(): number {
        return Math.round(Math.random() * (this.max - this.min) + this.min);
    }

    ngOnInit(): void {
        this.randomizeStats();
    }
}
