<template>
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
</template>
<script>
export default {
    props: {

    }
}
</script>
