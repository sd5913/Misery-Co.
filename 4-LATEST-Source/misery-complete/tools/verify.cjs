const assert=require('node:assert/strict');const {make,fresh,restore}=require('../game.js');
function take(g,id){assert(g.take(id).ok);return g.s.tray.at(-1).uid}
function cook(g,ids,processed=[]){for(const id of ids){const u=take(g,id);if(processed.includes(id)){assert(g.prepare(u).ok);assert(g.process(id==='flower'?'pluck':'grind').ok);assert(g.add('prep').ok)}else assert(g.add(u).ok)}assert(g.warm(1).ok);assert(g.stir(1).ok);assert(g.pour(1,true).ok);return g.seal()}
let g=make();assert(!g.seal().ok);assert(!g.stir(1).ok);assert(!g.pour(1,true).ok);
let r=cook(g,['rain','flower']);assert.equal(r.product,'flowers');assert.equal(g.s.coins,48);assert.equal(g.s.products[0].bonus,1);assert(g.serve(g.s.products[0].uid).ok);assert.equal(g.s.coins,52);assert.equal(g.s.warmth,67);assert.equal(g.customer().want,'moon');
r=cook(g,['mushroom','feather']);assert.equal(r.product,'moon');assert(g.serve(g.s.products[0].uid).ok);
r=cook(g,['leaf','berries','rain']);assert.equal(r.product,'butterfly');assert(g.serve(g.s.products[0].uid).ok);
assert.equal(g.s.warmth,71);g.s.taskAccepted=true;assert(g.claimTask().ok);assert.equal(g.s.warmth,75);assert(!g.claimTask().ok);assert(g.activity().ok);assert(!g.activity().ok);
g=make();r=cook(g,['mushroom','flower']);assert(r.slime);assert.equal(g.s.failed,1);assert.equal(g.s.stock.mushroom,1);assert.equal(g.s.products.length,0);assert.equal(g.s.coins,42);
g=make();for(const id of ['rain','flower'])assert(g.harvest(id).ok);assert(!g.harvest('rain').ok);assert.equal(g.s.stock.rain,6);const u=take(g,'leaf');assert(g.prepare(u).ok);assert(g.process('grind').ok);assert(g.unprep().ok);assert(!g.putBack(u).ok);assert(g.add(u).ok);const v=take(g,'berries');assert(g.add(v).ok);g.warm(.45);let loaded=make(restore(JSON.stringify(g.s)));assert.equal(loaded.s.batch.heat,.45);assert.equal(loaded.s.batch.items[0].form,'powder');assert(loaded.clear().ok);assert.equal(loaded.s.tray[0].form,'powder');
loaded.nextDay();assert.equal(loaded.s.day,2);assert.equal(loaded.s.harvested.length,0);assert(loaded.harvest('rain').ok);assert.equal(loaded.s.tray.length,2);assert.equal(loaded.s.history.length,1);
g=make();for(let i=0;i<3;i++)assert(g.sellTraditional().ok);assert(!g.sellTraditional().ok);g.s.taskAccepted=true;assert(!g.claimTask().ok);assert(g.visit('martha').ok);assert(!g.visit('martha').ok);assert(!g.activity().ok);g.nextDay();assert(g.visit('martha').ok);assert.equal(g.s.traditional,3);
g=make();const rawUid=take(g,'rain');assert(g.putBack(rawUid).ok);assert.equal(g.s.stock.rain,3);for(const id of ['rain','flower','leaf'])assert(g.add(take(g,id)).ok);const fourth=take(g,'berries');assert(!g.add(fourth).ok);assert(g.s.tray.some(i=>i.uid===fourth));
assert.deepEqual(restore('broken'),fresh());const malformed=fresh();malformed.batch.heat=NaN;assert.deepEqual(restore(JSON.stringify(malformed)),fresh());
console.log('PASS: three raw-ingredient recipes, each ingredient x1, wrong recipe consumption, coins, tips, customer preferences, municipal task, pavilion threshold, harvest/day reset, persistent intermediates, return materials, max batch, malformed save.');

g=make();r=cook(g,['rain','rain']);assert(r.slime);assert.equal(g.s.stock.rain,1);assert.equal(g.s.products.length,0);
