import { ResponsivePie } from '@nivo/pie'
import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// @ts-ignore



function PieStat(props: any) {
    const [agePieData, setAgePieData] = React.useState([
        {"id": "",
        "label": "",
        "value": 0,
        "color": ""}]);
    const [cityPieData, setCityPieData] = React.useState([
        {"id": "",
            "label": "",
            "value": 0,
            "color": ""}]);
    const [barData, setBarData] = React.useState([
        {"age": "",
        "party members": 0,
        "party membersColor": "hsl(128, 70%, 50%)"}]);
    // const [partyMembers, setPartyMembers] = React.useState([])
    // const center = ["חולון", "ראשון לציון", "תל אביב","יפו"];
    // const negev = ["אשקלון", "אשדוד", "באר שבע"];
    // const safon = ["חיפה", "זכרון יעקב"];
    useEffect(() => {
        // Update the document title using the browser API
       // getCandidates();
        createData();

    },);

    // async function getCandidates() {
    //     const header = new Headers();
    //     header.append('Access-Control-Allow-Origin', '*');
    //     header.append('Content-Type', 'application/json;charset=utf-8')
    //     const token = 'Bearer ' + localStorage.getItem('token');
    //     header.append('Authorization',token );
    //     try {
    //         const response = await fetch("/Data/getAllMembersInformation?input=" +localStorage.getItem("key")+","+localStorage.getItem("partyName") ,{
    //             method: "GET",
    //             headers: header,
    //         });
    //         if (response.ok) {
    //             let res = await response.json();
    //             setPartyMembers(res);
    //
    //             //let str = "";
    //             console.log(res);
    //             //res.forEach((can: { id: string; status: string; })=>{ str += ", " + can.id +" " + can.status + "\n"})
    //             //console.log(str);
    //         }
    //         else {
    //             alert(response.status);
    //         }
    //
    //     }catch (e) {
    //         console.log("My error: " + e);
    //     }
    // }


    function createData() {
        //GENDER PIE
        let count1 = 150;
        let count2 = 210;
        let count3 = 40;
        let count4 = 175;
        let count5 = 125;
        let count6 = 80;
        let count7 = 20;
        let count8 = 100;
        let count9 = 190;
        let count10 = 110;
        // partyMembers.map(({gender, age, address}) =>{
        //     if(gender === 'נקבה')
        //         count1++;
        //     if(gender === 'זכר')
        //         count2++;
        //     if((gender !== 'נקבה')&&(gender !== 'זכר'))
        //         count3++;
        //     if((18 <= age) && (age < 30))
        //         count4++;
        //     if((30 <= age) && (age < 40))
        //         count5++;
        //     if((40 <= age) && (age < 50))
        //         count6++;
        //     if((50 <= age)&& (age < 60) )
        //         count7++;
        //     if(center.includes(address))
        //         count8++;
        //     if(safon.includes(address))
        //         count9++;
        //     if(negev.includes(address))
        //         count10++;
        //     return 0;
        // };
        setAgePieData([ {
            "id": "male",
            "label": "זכר",
            "value": count2,
            "color": "hsl(174, 70%, 50%)"
        },
            {
                "id": "female",
                "label": "נקבה",
                "value": count1,
                "color": "hsl(275, 70%, 50%)"
            },
            {
                "id": "unknown",
                "label": "לא מעוניין להצהיר",
                "value": count3,
                "color": "hsl(103, 70%, 50%)"
            }]);
        setCityPieData([ {
            "id": "center",
            "label": "מרכז",
            "value": count8,
            "color": "hsl(174, 70%, 50%)"
        },
            {
                "id": "north",
                "label": "צפון",
                "value": count9,
                "color": "hsl(275, 70%, 50%)"
            },
            {
                "id": "south",
                "label": "דרום",
                "value": count10,
                "color": "hsl(103, 70%, 50%)"
            }]);
        setBarData([
        {"age": "18-30",
            "party members": count4,
            "party membersColor": "hsl(128, 70%, 50%)"},
            {"age": "30-40",
                "party members": count5,
                "party membersColor": "hsl(128, 70%, 50%)"},
            {"age": "40-50",
                "party members": count6,
                "party membersColor": "hsl(128, 70%, 50%)"},
            {"age": "50-60",
                "party members": count7,
                "party membersColor": "hsl(128, 70%, 50%)"},
            {"age": "60-70",
                "party members": 10,
                "party membersColor": "hsl(128, 70%, 50%)"}
        ])


    }

    return (
<div>
    <NavBar />
<div>

<div style={{ height:"500px", width:"100%", marginTop:"100px"}}>
        <div style={{ marginLeft:"50px",height:"500px", width:"25%",display:"inline-block"}} >
            <h1 style={{marginLeft: "150px"}} >מגדר</h1>
        <ResponsivePie
            data={agePieData}
            margin={{top: 40, bottom: 80}}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{scheme: 'nivo'}}
            borderWidth={1}
            borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{from: 'color'}}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
        </div>
<div style={{marginLeft:"20px", marginRight:"20px",height:"500px", width:"40%",  display:"inline-block"}}>
    <h1 style={{marginLeft: "300px"}}>גיל</h1>
            <ResponsiveBar
                data={barData}
                keys={[ 'party members']}
                indexBy="age"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'set2' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'age',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'numbers',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
</div>
    <div style={{ marginRight:"10px",height:"500px", width:"25%",display:"inline-block"}} >
        <h1 style={{marginLeft: "100px"}}>אזור מגורים</h1>
        <ResponsivePie
            data={cityPieData}
            margin={{top: 40, bottom: 80}}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{scheme: 'set1'}}
            borderWidth={1}
            borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{from: 'color'}}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
</div>
        </div>
        </div>

    )
}

export default PieStat;