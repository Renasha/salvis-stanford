import { React } from 'react';
import WaysGraph from "./graphs/WaysGraph";

export function WAYSWindow() {
    return (
        <div className="relative ml-16 mt-16">
            <div className="h-full w-full pt-4">
                <div className="flex flex-wrap">
                    <WaysGraph />
                </div>
            </div>
        </div>
    );
}
