const STATUSES = {
    dirty: 'dirty',
    wet: 'wet',
    clean: 'clean'
}

// Porcentagem de um campo se autolimpar
const  CHANCE_TO_CLEAN = 7;

// In this simple problem the world includes both the environment and the robot
// but in most problems the environment and world would be separate
class World {

    constructor(numFloors) {
        this.location = 0;
        this.floors = [];
        for (let i = 0; i < numFloors; i++) {
            this.floors.push({dirty: false, wet: false});
        }
    }

    switchDirtyStatus(floorNumber) {

        let floor = this.floors[floorNumber];

        if(!floor.dirty && !floor.wet) {
            return this.markFloorWet(floorNumber);
        } else if(floor.wet) {
            return this.markFloorDirty(floorNumber);
        }

        let willClean = (Math.floor(Math.random() * (100 - 0)) + 0) < CHANCE_TO_CLEAN;

        return willClean ? this.unmarkFloor(floorNumber) : STATUSES.dirty;

    }

    markFloorDirty(floorNumber) {

        this.unmarkFloor(floorNumber);
        this.floors[floorNumber].dirty = true;

        return STATUSES.dirty;

    }

    markFloorWet(floorNumber) {

        this.unmarkFloor(floorNumber);
        this.floors[floorNumber].wet = true;

        return STATUSES.wet;

    }

    unmarkFloor(floorNumber) {

        this.floors[floorNumber].dirty = false;
        this.floors[floorNumber].wet = false;

        return STATUSES.clean;

    }

// UP e DOWN adicionados, alem de novas condicões para LEFT e RIGHT
    simulate(action) {
        switch(action) {
        case 'SUCK':
            this.floors[this.location].dirty = false;
            break;
        case 'DRY':
            this.floors[this.location].wet = false;
            break;
        case 'LEFT':
            if(this.location == 1)this.location = 0;
            else if(this.location == 3)this.location = 2;
            break;
        case 'RIGHT':
            if(this.location == 0)this.location = 1;
            else if(this.location == 2)this.location = 3;
            break;
            // adicionados
        case 'UP':
            if(this.location == 2)this.location = 0;
            else if(this.location == 3)this.location = 1;
            break;
        case 'DOWN':
            if(this.location == 0)this.location = 2;
            else if(this.location == 1)this.location = 3;
            break;
        }
        return action;
    }
}

// Rules are defined in code
function reflexVacuumAgent(world) {
    if (world.floors[world.location].dirty) { return 'SUCK'; }
    else if(world.floors[world.location].wet) {return 'DRY';}
    else if (world.location == 0){ 
        if(world.floors[2].dirty || world.floors[2].wet) {return 'DOWN';}
        return 'RIGHT';
    }
    else if (world.location == 1){
        if(world.floors[0].dirty || world.floors[0].wet) {return 'LEFT';}
        return 'DOWN'; 
    }
    else if (world.location == 2){ 
        if(world.floors[3].dirty || world.floors[3].wet) {return 'RIGHT';}
        return 'UP';
    }
    else if (world.location == 3){ 
        if(world.floors[1].dirty || world.floors[1].wet) {return 'UP';}
        return 'LEFT';
    }
}