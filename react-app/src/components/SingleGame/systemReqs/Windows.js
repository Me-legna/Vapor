function WindowsSysReqs({ activeSystem }) {
	return (
		<div
			className="p-0 text-white system-info-ctn"
			style={{ display: activeSystem === "Windows" ? "flex" : "none" }}
		>
			<div>
				<ul>
					Minimum:
					<li>
						<strong>OS:</strong>
						Windows Vista 64bit, Window 7 64bit, Windows 8 64bit (32bit O/S not
						supported)
					</li>
					<li>
						<strong>Processor:</strong>
						Core 2 Duo 2.4GHz or Athlon X2 2.7GHz
					</li>
					<li>
						<strong>Memory:</strong>4 GB RAM
					</li>
					<li>
						<strong>Graphics:</strong>
						DirectX 10 or 11 compatible card, ATI Radeon 3870 or higher, NVIDIA
						GeForce 8800 GT or higher with 512MB graphics memory, Intel HD
						Graphics 2500 or higher
					</li>
					<li>
						<strong>DirectX:</strong>
						Version 10
					</li>
					<li>
						<strong>Storage:</strong>
						20 GB available space
					</li>
					<li>
						<strong>Sound Card:</strong>DirectX compatible sound card
					</li>
				</ul>
			</div>
			<div style={{ marginLeft: "1.5rem" }}>
				<ul>
					Recommended:
					<li>
						<strong>OS:</strong>
						Windows Vista 64bit, Window 7 64bit, Windows 8 64bit (32bit O/S not
						supported)
					</li>
					<li>
						<strong>Processor:</strong>
						Core i5-2300, Phenom II X4 940 or better
					</li>
					<li>
						<strong>Memory:</strong>8 GB RAM
					</li>
					<li>
						<strong>Graphics:</strong>
						DirectX 10 or 11 compatible card, ATI Radeon 7750, NVIDIA GeForce
						GTX 560 or higher with 1GB graphics memory, Intel HD Graphics 4000
						or higher
					</li>
					<li>
						<strong>DirectX:</strong>
						Version 11
					</li>
					<li>
						<strong>Storage:</strong>
						20 GB available space
					</li>
					<li>
						<strong>Sound Card:</strong>DirectX compatible sound card
					</li>
				</ul>
			</div>
		</div>
	);
}
export default WindowsSysReqs;
