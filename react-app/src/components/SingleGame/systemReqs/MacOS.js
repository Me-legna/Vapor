function MacOSSysReqs({ activeSystem }) {
	return (
		<div
			className="p-0 text-white system-info-ctn"
			style={{ display: activeSystem === "MacOS" ? "flex" : "none" }}
		>
			<div>
				<ul>
					Minimum:
					<li>
						<strong>OS:</strong>
						10.10.5
					</li>
					<li>
						<strong>Processor:</strong>
						2Ghz
					</li>
					<li>
						<strong>Memory:</strong>4 GB RAM
					</li>
					<li>
						<strong>Graphics:</strong>
						1GB VRAM *
					</li>
					<li>
						<strong>Storage:</strong>
						20 GB available space
					</li>
					<li>
						<strong>Additional Notes:</strong>* The following graphics cards are
						not supported: AMD Radeon HD 4xxx series, AMD Radeon HD 5xxx series,
						ATI X1xxx series, ATI HD2xxx series, Intel Iris 5100, Intel HD5000,
						Intel Iris 6100, Intel HD5300, Intel GMA series, Intel HD3000, Intel
						HD4000, NVIDIA 1xx series, NVIDIA 9xxx series, NVIDIA 8xxx series,
						NVIDIA 7xxx series and NVIDIA 3xx series.
					</li>
				</ul>
			</div>
			<div style={{ marginLeft: "1.5rem" }}>
				<ul>
					Recommended:
					<li>
						<strong>OS:</strong>
						11.11.2
					</li>
					<li>
						<strong>Processor:</strong>
						2.8Ghz
					</li>
					<li>
						<strong>Memory:</strong>8 GB RAM
					</li>
					<li>
						<strong>Graphics:</strong>
						2GB VRAM *
					</li>
					<li>
						<strong>Storage:</strong>
						20 GB available space
					</li>
					<li>
						<strong>Additional Notes:</strong>* The following graphics cards are
						not supported: AMD Radeon HD 4xxx series, AMD Radeon HD 5xxx series,
						ATI X1xxx series, ATI HD2xxx series, Intel Iris 5100, Intel HD5000,
						Intel Iris 6100, Intel HD5300, Intel GMA series, Intel HD3000, Intel
						HD4000, NVIDIA 1xx series, NVIDIA 9xxx series, NVIDIA 8xxx series,
						NVIDIA 7xxx series and NVIDIA 3xx series.
					</li>
				</ul>
			</div>
		</div>
	);
}
export default MacOSSysReqs;
