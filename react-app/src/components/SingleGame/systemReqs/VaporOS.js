function VaporOSSysReqs({ activeSystem }) {
	return (
		<div
			className="p-0 text-white system-info-ctn"
			style={{
				display: activeSystem === "VaporOS + Linux" ? "flex" : "none",
			}}
		>
			<div>
				<ul>
					Minimum:
					<li>
						<strong>OS:</strong>
						Ubuntu 14.04/VaporOS
					</li>
					<li>
						<strong>Processor:</strong>
						Dual Core
					</li>
					<li>
						<strong>Memory:</strong>4 GB RAM
					</li>
					<li>
						<strong>Graphics:</strong>
						OpenGL 2.1+, GLSL 1.2+, 1GB VRAM *
					</li>
					<li>
						<strong>Storage:</strong>
						20 GB available space
					</li>
					<li>
						<strong>Additional Notes:</strong>Windowed mode recommended due to
						possible base input issues.
					</li>
				</ul>
			</div>
			<div style={{ marginLeft: "1.5rem" }}>
				<ul>
					Recommended:
					<li>
						<strong>OS:</strong>
						Ubuntu 14.04/VaporOS
					</li>
					<li>
						<strong>Processor:</strong>
						Quad Core
					</li>
					<li>
						<strong>Memory:</strong>8 GB RAM
					</li>
					<li>
						<strong>Graphics:</strong>
						OpenGL 3.1+, GLSL 2.1+, 2GB VRAM *
					</li>
					<li>
						<strong>Storage:</strong>
						20 GB available space
					</li>
					<li>
						<strong>Additional Notes:</strong>Windowed mode recommended due to
						possible base input issues.
					</li>
				</ul>
			</div>
		</div>
	);
}
export default VaporOSSysReqs;
