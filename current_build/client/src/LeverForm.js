import React, {useState} from 'react'


function LeverForm(props) {
    const [demands, setDemands] = useState("1.0");
    const [carryover, setCarryover] = useState("1.0");
    const [priority, setPriority] = useState("0");
    const [delta, setDelta] = useState("1");
    const [minflow, setMinflow] = useState("0");

    const submission = () => {
        const levers = {
            demands: demands, 
            carryover: carryover, 
            priority: priority, 
            delta: delta, 
            minflow: minflow
        };
        
        props.handleSubmit(levers);
    }

    const handleChange = (event) => {
        // console.log(event.target);
        switch(event.target.name) {
            case "demands":
                setDemands(event.target.value);
                break;
            case "carryover":
                setCarryover(event.target.value);
                break;
            case "priority":
                setPriority(event.target.value);
                break;
            case "delta":
                setDelta(event.target.value);
                break;
            case "minflow":
                setMinflow(event.target.value);
                break;                          
            default:
                break;
        }
    }   

    return (
        <div class="block" style={{gridColumn: "1 / -1"}}>
            <div style={{display: "flex", flexDirection: "row", gap: "1rem",}}>
            {/* <form style={{display: "flex", flexDirection: "row", gap: "1rem",}} onSubmit={submission}> */}
                <div>
                    <p>Agriculture Demands</p>
                    <input type="radio" id="demands-1" name="demands" value="1.0" onChange={handleChange} required />
                    <label for="1.0">Baseline</label> <br/>
                    <input type="radio" id="demands-0-9" name="demands" value="0.9" onChange={handleChange} required />
                    <label for="0.9">90% of baseline</label> <br/>
                    <input type="radio" id="demands-0-8" name="demands" value="0.8" onChange={handleChange} required />
                    <label for="0.8">80% of baseline</label> <br/>
                    <input type="radio" id="demands-0-7" name="demands" value="0.7" onChange={handleChange} required />
                    <label for="0.7">70% of baseline</label> <br/>
                    <input type="radio" id="demands-0-6" name="demands" value="0.6" onChange={handleChange} required />
                    <label for="0.6">60% of baseline</label>
                </div>

                <div>
                    <p>Carryover</p>
                    <input type="radio" id="carryover-1" name="carryover" value="1.0" onChange={handleChange} required/>
                    <label for="1.0">Baseline</label> <br/>
                    <input type="radio" id="carryover-1-1" name="carryover" value="1.1" onChange={handleChange} required/>
                    <label for="1.0">10% increase in target</label> <br/>
                    <input type="radio" id="carryover-1-2" name="carryover" value="1.2" onChange={handleChange} required/>
                    <label for="1.0">20% increase in target</label>
                </div>

                <div>
                    <p>Distribution Priority</p>
                    <input type="radio" id="priority-0" name="priority" value="0" onChange={handleChange} required/>
                    <label for="0">Baseline using existing tiers for allocation cuts</label> <br/>
                    <input type="radio" id="priority-1" name="priority" value="1" onChange={handleChange} required/>
                    <label for="1">shortages are shared equally across contract types</label>
                </div>

                <div>
                    <p>Delta Regulations</p>
                    <input type="radio" id="delta-1" name="delta" value="1" onChange={handleChange} required/>
                    <label for="1">Baseline, all D1641 regulations in place</label> <br/>
                    <input type="radio" id="delta-2" name="delta" value="2" onChange={handleChange} required/>
                    <label for="2">No flow reqt, NDO and Rio Vista flows turned off</label> <br/>
                    <input type="radio" id="delta-3" name="delta" value="3" onChange={handleChange} required/>
                    <label for="3">No salinity reqt, station salinity & X2 requirements off</label> <br/>
                    <input type="radio" id="delta-4" name="delta" value="4" onChange={handleChange} required/>
                    <label for="4">No D1641 flow or salinity requirements</label>
                </div>

                <div>
                    <p>Minimum Flow Requirements</p>
                    <input type="radio" id="minflow-0" name="minflow" value="0" onChange={handleChange} required/>
                    <label for="0">Baseline, all pre-existing minimum flow requirements in place</label> <br/>
                    <input type="radio" id="minflow-0-4" name="minflow" value="0.4" onChange={handleChange} required/>
                    <label for="0.4">40% of unimpaired flow requirement takes place of existing minimum flows</label> <br/>
                    <input type="radio" id="minflow-0-6" name="minflow" value="0.6" onChange={handleChange} required/>
                    <label for="0.6">60% of unimpaired flow</label> <br/>
                    <input type="radio" id="minflow-0-7" name="minflow" value="0.7" onChange={handleChange} required/>
                    <label for="0.7">70% of unimpaired flow</label> <br/>
                    <input type="radio" id="minflow-0-8" name="minflow" value="0.8" onChange={handleChange} required/>
                    <label for="0.8">80% of unimpaired flow</label>

                </div>
                <button onClick={submission}>Submit</button>
            {/* </form> */}
            </div>
        </div>
  )
}

export default LeverForm