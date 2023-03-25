import { useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import MacOSSysReqs from "./MacOS";
import WindowsSysReqs from "./Windows";
import VaporOSSysReqs from "./VaporOS";

function SystemRequirements(){
    const singleGame = useSelector(state => state.games.singleGame)
	const [systemInfo, setSystemInfo] = useState(singleGame.systems[0]);

    return (
			<section className="game-info-text">
				<h3>SYSTEM REQUIREMENTS</h3>
				<Breadcrumb>
					{singleGame.systems.map((system) => (
						<Breadcrumb.Item
							onClick={() => setSystemInfo(system)}
							active={systemInfo === system}
						>
							{system}
						</Breadcrumb.Item>
					))}
				</Breadcrumb>

				<MacOSSysReqs activeSystem={systemInfo} />

				<WindowsSysReqs activeSystem={systemInfo} />

				<VaporOSSysReqs activeSystem={systemInfo} />
			</section>
		);
}

export default SystemRequirements;
