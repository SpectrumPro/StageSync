import { useState } from "react";
import Aside from "./components/aside";
import Navbar from "./components/navbar";
import { HexColorPicker } from "react-colorful";

const Index = () => {

    const [color, setColor] = useState("#000000");

    const [selectedLight, setSelectedLight] = useState(-0);

    const [lights, setLights] = useState([
        { id: 0, col: 1, row: 1, color: "#000000", noAnimation:false},
        { id: 1, col: 1, row: 2, color: "#000000", noAnimation:false},
        { id: 2, col: 2, row: 2, color: "#000000", noAnimation:false},
        { id: 3, col: 3, row: 2, color: "#000000", noAnimation:false},
        { id: 4, col: 4, row: 2, color: "#000000", noAnimation:false},
        { id: 5, col: 5, row: 2, color: "#000000", noAnimation:false},
        { id: 0, col: 5, row: 1, color: "#000000", noAnimation:false},
    ]);

    function lightClick(light) {
        setSelectedLight(selectedLight == light ? -1 : light)
        setColor(lights[light].color)
    }

    function colorChanged(color) {
        setLights(lights.map(light => {
            if (light.id == selectedLight) {
                return { ...light, color: color };
            }
            return light;
        }))
        setColor(color)
        sendValues()
    }


    async function sendValues() {
        await fetch("/api/lighting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lights),
        });
    }

    return (
        <div class="h-screen bg-black">
            {Navbar("Lighting")}

            <Aside></Aside>

            <main class="md:ml-64 h-auto pt-20 flex items-center justify-center">

                <div className=" bg-slate-900 w-64 h-64 rounded-2xl flex items-center justify-center mr-10">
                    <HexColorPicker color={color} onChange={colorChanged} className={`${selectedLight == -1 ? "opacity-40" : ""} transition-all`}/>
                </div>
                <div className="grid gap-4 text-black max-w-6xl bg-slate-900 rounded-2xl p-5 grid-cols-5">
                    {lights.map((light) => (
                        <div
                            key={light.id}
                            onClick={() => lightClick(light.id)}
                            className={`col-start-${light.col} row-start-${light.row} w-20 h-20 flex items-center justify-center m-5 `}>
                            <div className={`light ${selectedLight == light.id ? "lightSelected" : ""}` } style={{backgroundColor: light.color}}>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Index;
