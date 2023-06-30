function inceputPagina()
{
	window.scrollTo({top: 0, behavior: "smooth"});
}

function sfarsitPagina()
{
	window.scrollTo({top: document.documentElement.scrollHeight, behavior: "smooth"});
}

window.onload = function()
{
	var butonSus = document.getElementById("buton_sus");
	butonSus.addEventListener("click", function() { inceputPagina(); });
	butonSus.style.backgroundColor = "white";
	butonSus.style.position = "fixed";
	butonSus.style.bottom = "20px";
	butonSus.style.right = "20px";

	var butonJos = document.getElementById("buton_jos");
	butonJos.addEventListener("click", function() { sfarsitPagina(); });
	butonJos.style.backgroundColor = "white";
	butonJos.style.position = "fixed";
	butonJos.style.bottom = "20px";
	butonJos.style.right = "20px";

	var imagineButonSus = document.createElement("img");
	imagineButonSus.src = "buttons/buton_sus.png";
	imagineButonSus.alt = "Inceput Pagina";

	var imagineButonJos = document.createElement("img");
	imagineButonJos.src = "buttons/buton_jos.png";
	imagineButonJos.alt = "Sfarsit Pagina";

	butonSus.appendChild(imagineButonSus);
	butonJos.appendChild(imagineButonJos);

	//var dimensiuneButon = "100";

	//butonSus.style.width = dimensiuneButon + "px";
	//butonSus.style.height = dimensiuneButon + "px";
	//butonJos.style.width = dimensiuneButon + "px";
	//butonJos.style.height = dimensiuneButon + "px";
	//imagineButonJos.style.width = dimensiuneButon + "px";
	//imagineButonJos.style.height = dimensiuneButon + "px";
	//imagineButonSus.style.width = dimensiuneButon + "px";
	//imagineButonSus.style.height = dimensiuneButon + "px";

	window.addEventListener("scroll", function()
	{
		var butonSus = document.getElementById("buton_sus");
		var butonJos = document.getElementById("buton_jos");
		
		if (window.scrollY > (document.documentElement.scrollHeight / 2))
		{
			butonJos.style.display = "none";
			butonSus.style.display = "block";
			butonJos.disabled = true;
			butonSus.disabled = false;
		}
		else
		{
			butonSus.style.display = "none";
			butonJos.style.display = "block";	
			butonJos.disabled = false;
			butonSus.disabled = true;
		}
	});
}