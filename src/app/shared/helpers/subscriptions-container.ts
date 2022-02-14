import { Subscription } from "rxjs";

export class Subscriptionscontainer {
    private subs: Subscription[] = [];

    set add (s:Subscription){
        this.subs.push(s)
    }
    
    dispose(): void {
        this.subs.forEach((s) => s.unsubscribe());
    }
}

