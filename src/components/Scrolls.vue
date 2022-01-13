<template>
	<div>
		<h1 class="container text-center text-0 p-8 text-5xl font-bold">
			{{ title }}
		</h1>


		<div class="flex justify-center items-center">
			<button
				v-if="keep === false"
				@click="
					keep = !keep;
					if (sell) {
						sell = !sell;
					}
				"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 mr-2 p-1 rounded"
			>
				KEEP
				<span class="text-xs">memes</span>
			</button>
			<button
				v-if="keep === true"
				@click="keep = !keep"
				class="bg-600 text-center text-green text-2xl inline w-20 mb-10 mr-2 p-1 rounded"
			>
				KEEP
				<span class="text-xs">memes</span>
			</button>
			<button
				v-if="sell === false"
				@click="
					sell = !sell;
					if (keep) {
						keep = !keep;
					}
				"
				class="bg-600 text-center text-0 text-2xl inline w-20 mb-10 ml-2 p-1 rounded"
			>
				SELL
				<span class="text-xs">memes</span>
			</button>
			<button
				v-if="sell === true"
				@click="sell = !sell"
				class="bg-600 text-center text-red text-2xl inline w-20 mb-10 ml-2 p-1 rounded"
			>
				SELL
				<span class="text-xs">memes</span>
			</button>
		</div>


		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-12 text-center">
			<div class="bg-600 text-0 rounded h-44 text-xl relative">
				<h1
					class="my-3 font-bold text-2xl"
					:class="!toggleAncient && 'mt-11 text-4xl'"
				>
					<img
						src="../assets/ancient_relic_crystal_summon_scroll.png"
						class="inline object-scale-down h-9 relative bottom-2"
					/>Ancient Relic Crystal
				</h1>
				<input
					type="number"
					placeholder="Seconds Per Scroll"
					v-if="toggleAncient"
					v-model="ancientTime"
					@input="
						numPartsPerHour(ancientTime);
						profitIfKeepPerScroll(ancientTime);
						profitIfSellPerScroll(ancientTime);
					"
					class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
				/>
				<div class="mt-3">
					<h1>
						Average
						<img
							src="../assets/memory_fragment.png"
							class="inline object-scale-down h-6"
						/>
						per scroll: <span class="font-bold text-red">5</span>
					</h1>
				</div>
				<button
					@click="toggleAncient = !toggleAncient"
					class="absolute top-0 right-5 text-5xl text-green rounded bg-700 w-10"
				>
					+
				</button>
				<button
					@click="toggleAncient = !toggleAncient"
					v-show="toggleAncient"
					class="absolute top-0 right-5 text-5xl text-red rounded bg-700 w-10"
				>
					-
				</button>
			</div>
			<div class="bg-600 text-0 rounded h-44 text-xl relative">
				<h1
					class="m-3 font-bold text-2xl"
					:class="!toggleCartian && 'mt-11 text-4xl'"
				>
					<img
						src="../assets/cartian_spell.png"
						class="inline object-scale-down h-9 relative bottom-2"
					/>Cartian Spell
				</h1>
				<input
					type="number"
					placeholder="Seconds Per Scroll"
					v-if="toggleCartian"
					v-model="cartianTime"
					@input="
						numPartsPerHour(cartianTime);
						profitIfKeepPerScroll(cartianTime);
						profitIfSellPerScroll(cartianTime);
					"
					class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
				/>
				<div class="mt-3">
					<h1>
						Average
						<img
							src="../assets/memory_fragment.png"
							class="inline object-scale-down h-6"
						/>
						per scroll: <span class="font-bold text-yellow">6</span>
					</h1>
				</div>
				<button
					@click="toggleCartian = !toggleCartian"
					class="absolute top-0 right-5 text-5xl text-green rounded bg-700 w-10"
				>
					+
				</button>
				<button
					@click="toggleCartian = !toggleCartian"
					v-show="toggleCartian"
					class="absolute top-0 right-5 text-5xl text-red rounded bg-700 w-10"
				>
					-
				</button>
			</div>
			<div class="bg-600 text-0 rounded h-44 text-xl relative">
				<h1
					class="m-3 font-bold text-2xl"
					:class="!togglePila && 'mt-11 text-4xl'"
				>
					<img
						src="../assets/pila_fe_scroll.png"
						class="inline object-scale-down h-9 relative bottom-2"
					/>Pila Fe Scroll
				</h1>
				<input
					type="number"
					placeholder="Seconds Per Scroll"
					v-if="togglePila"
					v-model="pilaTime"
					@input="
						numPartsPerHour(pilaTime);
						profitIfKeepPerScroll(pilaTime);
						profitIfSellPerScroll(pilaTime);
					"
					class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
				/>
				<div class="mt-3">
					<h1>
						Average
						<img
							src="../assets/memory_fragment.png"
							class="inline object-scale-down h-6"
						/>
						per scroll: <span class="font-bold text-green">7</span>
					</h1>
					<button
						@click="togglePila = !togglePila"
						class="absolute top-0 right-5 text-5xl text-green rounded bg-700 w-10"
					>
						+
					</button>
					<button
						@click="togglePila = !togglePila"
						v-show="togglePila"
						class="absolute top-0 right-5 text-5xl text-red rounded bg-700 w-10"
					>
						-
					</button>
				</div>
			</div>
			<div
				v-show="toggleAncient"
				class="sm:col-start-1 sm:col-end-2 xxs:row-start-2"
			>
				<div class="bg-600 text-0 rounded h-13 text-xl relative mb-4">
					<h2 class="py-3">
						Number of
						<img
							src="../assets/ancient_relic_crystal_shard.png"
							class="inline object-scale-down h-6"
						/>
						for 1 hour: <span class="text-green">{{ shardsPerHour }}</span>
					</h2>
				</div>
				<div class="bg-600 text-0 rounded h-56 text-xl relative">
					<h2 class="py-3">
						Average silver spent per
						<img
							src="../assets/ancient_relic_crystal_shard.png"
							class="inline object-scale-down h-6"
						/>
						:
					</h2>
					<input
						type="number"
						placeholder="Silver"
						v-model="silverPerAncient"
						@input="
							profitIfKeepPerScroll(cartianTime);
							profitIfSellPerScroll(cartianTime);
						"
						class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
					/>
					<h2 class="py-3">
						Average silver per
						<img
							src="../assets/memory_fragment.png"
							class="inline object-scale-down h-6"
						/>
						:
					</h2>
					<input
						type="number"
						placeholder="Silver"
						v-model="silverPerMemeA"
						@input="
							profitIfKeepPerScroll(ancientTime);
							profitIfSellPerScroll(ancientTime);
						"
						class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
					/>
				</div>
				<div
					v-if="keep || sell"
					class="bg-600 text-0 rounded h-56 text-xl relative"
				>
					<h1 class="text-green text-2xl mt-4 p-4 font-bold">PROFITS</h1>
					<div v-if="keep">
						<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
							<h1>{{ ancientProfitKeep.toLocaleString() }} per scroll</h1>
						</div>
						<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
							<h1>
								{{ (ancientProfitKeep * (shardsPerHour / 5)).toLocaleString() }}
								per hour
							</h1>
						</div>
					</div>
					<div v-if="sell">
						<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
							<h1>{{ ancientProfitSell.toLocaleString() }} per scroll</h1>
						</div>
						<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
							<h1>
								{{ (ancientProfitSell * (shardsPerHour / 5)).toLocaleString() }}
								per hour
							</h1>
						</div>
					</div>
				</div>
			</div>
			<div
				v-show="toggleCartian"
				class="sm:col-start-2 sm:col-end-3"
				:class="
					toggleAncient
						? 'xxs:row-start-4 sm:row-start-2'
						: 'xxs:row-start-3 sm:row-start-2'
				"
			>
				<div class="bg-600 text-0 rounded h-13 text-xl relative mb-4">
					<h2 class="py-3">
						Number of
						<img
							src="../assets/forbidden_book.png"
							class="inline object-scale-down h-6"
						/>
						for 1 hour: <span class="text-green">{{ booksPerHour }}</span>
					</h2>
				</div>
				<div class="bg-600 text-0 rounded h-56 text-xl relative">
					<h2 class="py-3">
						Average silver spent per
						<img
							src="../assets/forbidden_book.png"
							class="inline object-scale-down h-6"
						/>
						:
					</h2>
					<input
						type="number"
						placeholder="Silver"
						v-model="silverPerCartian"
						@input="
							profitIfKeepPerScroll(cartianTime);
							profitIfSellPerScroll(cartianTime);
						"
						class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
					/>
					<h2 class="py-3">
						Average silver per
						<img
							src="../assets/memory_fragment.png"
							class="inline object-scale-down h-6"
						/>
						:
					</h2>
					<input
						type="number"
						placeholder="Silver"
						v-model="silverPerMemeC"
						@input="
							profitIfKeepPerScroll(cartianTime);
							profitIfSellPerScroll(cartianTime);
						"
						class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
					/>
				</div>
				<div
					v-if="keep || sell"
					class="bg-600 text-0 rounded h-56 text-xl relative"
				>
					<h1 class="text-green text-2xl mt-4 p-4 font-bold">PROFITS</h1>
					<div v-if="keep">
						<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
							<h1>{{ cartianProfitKeep.toLocaleString() }} per scroll</h1>
						</div>
						<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
							<h1>
								{{ (cartianProfitKeep * (booksPerHour / 5)).toLocaleString() }}
								per hour
							</h1>
						</div>
					</div>
					<div v-if="sell">
						<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
							<h1>{{ cartianProfitSell.toLocaleString() }} per scroll</h1>
						</div>
						<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
							<h1>
								{{ (cartianProfitSell * (booksPerHour / 5)).toLocaleString() }}
								per hour
							</h1>
						</div>
					</div>
				</div>
			</div>
			<div v-show="togglePila" class="sm:col-start-3">
				<div class="bg-600 text-0 rounded h-13 text-xl relative mb-4">
					<h2 class="py-3">
						Number of
						<img
							src="../assets/scroll_written_in_ancient_language.png"
							class="inline object-scale-down h-6"
						/>
						for 1 hour: <span class="text-green">{{ ancientLangPerHour }}</span>
					</h2>
				</div>
				<div class="bg-600 text-0 rounded h-56 text-xl relative">
					<h2 class="py-3">
						Average silver spent per
						<img
							src="../assets/scroll_written_in_ancient_language.png"
							class="inline object-scale-down h-6"
						/>
						:
					</h2>
					<input
						type="number"
						placeholder="Silver"
						v-model="silverPerPila"
						@input="
							profitIfKeepPerScroll(pilaTime);
							profitIfSellPerScroll(pilaTime);
						"
						class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
					/>
					<h2 class="py-3">
						Average silver per
						<img
							src="../assets/memory_fragment.png"
							class="inline object-scale-down h-6"
						/>
						:
					</h2>
					<input
						type="number"
						placeholder="Silver"
						v-model="silverPerMemeP"
						@input="
							profitIfKeepPerScroll(pilaTime);
							profitIfSellPerScroll(pilaTime);
						"
						class="text-center rounded bg-700 text-0 my-2 p-1 focus:outline-none"
					/>
				</div>
				<div
					v-if="keep || sell"
					class="bg-600 text-0 rounded h-56 text-xl relative"
				>
					<h1 class="text-green text-2xl mt-4 p-4 font-bold">PROFITS</h1>
					<div v-if="keep">
						<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
							<h1>{{ pilaProfitKeep.toLocaleString() }} per scroll</h1>
						</div>
						<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
							<h1>
								{{
									(pilaProfitKeep * (ancientLangPerHour / 5)).toLocaleString()
								}}
								per hour
							</h1>
						</div>
					</div>
					<div v-if="sell">
						<div class="bg-700 text-0 rounded w-auto mx-12 p-4">
							<h1>{{ pilaProfitSell.toLocaleString() }} per scroll</h1>
						</div>
						<div class="bg-700 text-0 rounded w-auto mx-12 mt-4 p-4">
							<h1>
								{{
									(pilaProfitSell * (ancientLangPerHour / 5)).toLocaleString()
								}}
								per hour
							</h1>
						</div>
					</div>
				</div>
			</div>
			<div
				class="bg-600 text-0 rounded sm:col-start-1 sm:col-end-4 h-80 mb-10"
			></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Scrolls",
	props: {
		title: String,
	},

	data() {
		return {
			keep: false,
			sell: false,

			memoryScrolls: [
				{
					name: 'Cartian',
					main_key: 40220,
					seconds: 80,
					memory: 6,
					toggle: false,
					cost: 15000000,
				},
				{
					name: 'Pila',
					main_key: 40228,
					seconds: 80,
					memory: 6,
					toggle: false,
					cost: 15000000,
				},
				{
					name: 'Relic',
					main_key: 40218,
					seconds: 80,
					memory: 6,
					toggle: false,
					cost: 15000000,
				},
			],
			memoryPrice: 0,

			ancientTime: null,
			cartianTime: null,
			pilaTime: null,

			memesPerAncient: 5,
			memesPerCartian: 6,
			memesPerPila: 7,

			toggleAncient: false,
			toggleCartian: false,
			togglePila: false,

			shardsPerHour: null,
			booksPerHour: null,
			ancientLangPerHour: null,

			silverPerAncient: null,
			silverPerCartian: null,
			silverPerPila: null,

			silverPerMemeA: null,
			silverPerMemeC: null,
			silverPerMemeP: null,

			ancientProfitKeep: 0,
			cartianProfitKeep: 0,
			pilaProfitKeep: 0,

			ancientProfitSell: 0,
			cartianProfitSell: 0,
			pilaProfitSell: 0,

			tax: null,

			prices: null
		};
	},

	created() {
		axios.get('https://garmoth.com/api/market').then(res => {
			this.prices = res.data.items

			this.silverPerAncient = this.prices[40218].sub[0].price
		})
	},

	methods: {
		numPartsPerHour(whichScroll) {
			if (whichScroll === this.ancientTime) {
				this.shardsPerHour = Math.round((3600 / this.ancientTime) * 5);
			}
			if (whichScroll === this.cartianTime) {
				this.booksPerHour = Math.round((3600 / this.cartianTime) * 5);
			}
			if (whichScroll === this.pilaTime) {
				this.ancientLangPerHour = Math.round((3600 / this.pilaTime) * 5);
			}
		},

		profitIfKeepPerScroll(whichScroll) {
			if (whichScroll === this.ancientTime) {
				this.ancientProfitKeep =
					this.memesPerAncient * this.silverPerMemeA -
					this.silverPerAncient * 5;
			}
			if (whichScroll === this.cartianTime) {
				this.cartianProfitKeep =
					this.memesPerCartian * this.silverPerMemeC -
					this.silverPerCartian * 5;
			}
			if (whichScroll === this.pilaTime) {
				this.pilaProfitKeep =
					this.memesPerPila * this.silverPerMemeP - this.silverPerPila * 5;
			}
		},

		profitIfSellPerScroll(whichScroll) {
			if (whichScroll === this.ancientTime) {
				this.ancientProfitSell =
					this.memesPerAncient * this.silverPerMemeA * this.tax -
					this.silverPerAncient * 5;
			}
			if (whichScroll === this.cartianTime) {
				this.cartianProfitSell =
					this.memesPerCartian * this.silverPerMemeC * this.tax -
					this.silverPerCartian * 5;
			}
			if (whichScroll === this.pilaTime) {
				this.pilaProfitSell =
					this.memesPerPila * this.silverPerMemeP * this.tax -
					this.silverPerPila * 5;
			}
		},
	},
};
</script>

<style>
@font-face {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	src: url("../fonts/poppins-v15-latin-regular.eot"); /* IE9 Compat Modes */
	src: local(""),
		url("../fonts/poppins-v15-latin-regular.eot?#iefix")
			format("embedded-opentype"),
		/* IE6-IE8 */ url("../fonts/poppins-v15-latin-regular.woff2")
			format("woff2"),
		/* Super Modern Browsers */ url("../fonts/poppins-v15-latin-regular.woff")
			format("woff"),
		/* Modern Browsers */ url("../fonts/poppins-v15-latin-regular.ttf")
			format("truetype"),
		/* Safari, Android, iOS */
			url("../fonts/poppins-v15-latin-regular.svg#Poppins") format("svg"); /* Legacy iOS */
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}

::-webkit-scrollbar {
    width: 14px;
    height: 18px;
    background-color: #202226;
}

::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
}

::-webkit-scrollbar-corner {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid transparent;
    border-radius: 0.25rem;
    background-color: #5e6165;
    background-clip: padding-box;
}
</style>
