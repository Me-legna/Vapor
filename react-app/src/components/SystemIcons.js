import logo from "../images/vapor-icon.png";


function SystemIcons({systems}){

    return (
			<>
				{systems.map((system, idx) =>
					system === "Windows" ? (
						<i key={`${idx}`} className="system-icon fa-brands fa-windows"></i>
					) : system === "MacOS" ? (
						<i key={`${idx}`} className="system-icon fa-brands fa-apple"></i>
					) : (
						<img
							key={`${idx}`}
							src={logo}
							alt="logo"
							className="system-icon logo"
						></img>
					)
				)}
			</>
		);
}

export default SystemIcons;
