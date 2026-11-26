const assert=require('node:assert/strict');const {make,restore}=require('../game.js');
const snapshot=count=>({version:1,count,plots:Array.from({length:6},()=>({stage:'seed',water:0,growth:0}))});
let g=make();assert(g.syncGarden(snapshot(3)).ok);assert.equal(g.s.stock.flower,6);assert.equal(g.s.gathered,3);g.syncGarden(snapshot(3));assert.equal(g.s.stock.flower,6);assert.equal(g.s.gathered,3);
assert(!g.syncGarden(snapshot(0)).ok);const restored=make(restore(JSON.stringify(g.s)));restored.syncGarden(snapshot(6));assert.equal(restored.s.stock.flower,9);assert.equal(restored.s.gathered,6);
restored.nextDay();assert.equal(restored.s.garden.count,6);assert.equal(restored.s.stock.flower,9);assert.equal(restored.s.gathered,0);
g=make();g.s.stock.flower=98;g.syncGarden(snapshot(6));assert.equal(g.s.stock.flower,99);assert.equal(g.s.gardenPending,5);g.take('flower');assert.equal(g.s.stock.flower,99);assert.equal(g.s.gardenPending,4);assert.equal(g.s.gathered,6);
assert(!g.syncGarden({...snapshot(9),plots:[]}).ok);assert(!g.syncGarden(snapshot(-1)).ok);assert(!g.syncGarden({...snapshot(9),plots:Array(6).fill({stage:'grow',water:2,growth:1})}).ok);
// Spend the newly farmed material on the first customer's order, then settle a full day.
g=make();g.s.stock.flower=0;g.syncGarden(snapshot(3));for(const id of ['flower','rain']){g.take(id);g.add(g.s.tray.at(-1).uid)}g.warm(1);g.stir(1);g.pour(1,true);assert.equal(g.seal().product,'flowers');assert(g.serve(g.s.products[0].uid).ok);g.sellTraditional();g.sellTraditional();g.s.taskAccepted=true;assert(g.claimTask().ok);assert.equal(g.summary().served,1);g.nextDay();assert.equal(g.s.day,2);assert.equal(g.s.stock.flower,2);assert.equal(g.s.garden.count,3);
const old={...g.s};delete old.garden;delete old.gardenPending;assert.equal(restore(JSON.stringify(old)).garden,null);
console.log('PASS: garden -> stock -> crafting -> customer -> municipal task -> next day; replay protection, full-stock pending, restore and old saves');
