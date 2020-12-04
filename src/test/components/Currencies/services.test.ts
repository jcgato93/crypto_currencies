
import * as chai from 'chai';
import { expect } from 'chai';
import CurrencyService from '../../../modules/Currency/currency.service';
import { PreferedCurrencyEnum } from '../../../modules/Currency/currency.model';
import { currencyIds, currencyResponse } from './mocks/currency.model.mocks';
chai.should();


describe("services - Currency", () => {

    describe('when findAll method is called', () => {
        
        it('should return the list of currencies ',(done) => {
           CurrencyService.findAll(PreferedCurrencyEnum.ARGENTINE_PESO)
           .then((currencies) => {
            expect(currencies).to.be.an('array');
            done();
           });
        });

        it('should return the list of currencies with length of 2  ',(done) => {
            CurrencyService.findAll(PreferedCurrencyEnum.ARGENTINE_PESO,1,2)
            .then((currencies) => {
             expect(currencies).to.be.an('array').with.lengthOf(2);
             done();
            });
         });
    });


    describe('when findOne method is called', () => {
        
        it('should return the currency information',(done) => {
           CurrencyService.findOne(currencyResponse.id)
           .then((currencies) => {
            expect(currencies).to.have.property('symbol');
            expect(currencies).to.have.property('name');
            expect(currencies).to.have.property('image');
            expect(currencies).to.have.property('current_price');
            done();
           });
        });

        it('when send the wrong id should return null',(done) => {
            CurrencyService.findOne('invalid id')
            .then((currencies) => {
             expect(currencies).to.be.eql(null);
             done();
            });
         });
    });

    describe('when findCurrenciesDetail method is called', () => {
        
        it('should return the currencies information',(done) => {
           CurrencyService.findCurrenciesDetail(currencyIds)
           .then((currencies) => {
            expect(currencies).to.be.an('array').with.lengthOf(currencyIds.length);
            expect(currencies[0]).to.have.property('id');
            expect(currencies[0]).to.have.property('symbol');
            expect(currencies[0]).to.have.property('name');
            expect(currencies[0]).to.have.property('image');
            expect(currencies[0]).to.have.property('last_updated');
            expect(currencies[0]).to.have.property('current_usd_price');
            expect(currencies[0]).to.have.property('current_eur_price');
            expect(currencies[0]).to.have.property('current_ars_price');
            done();
           }).catch();
        });
        
    });


})
